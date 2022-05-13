const config = require('./config');
var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var Gpio = require('onoff').Gpio;
const camera = require('./src/camera');
const uploadToS3 = require('./src/uploadToS3');

var sensor = require("node-dht-sensor");
const path = require('path');
const { readFile } = require('fs');
const fs = require('fs');
const cors = require('cors');

const pins = {
  led: new Gpio(17, 'out'),
  lamp: new Gpio(27, 'out')
}

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/js', express.static
  (path.join(__dirname, '/node_modules/socket.io-client/dist')));

//home page
app.get('/', (req, res) => {
  res.sendFile('index.html');
});

//endpoint to get temp
app.get('/temp', (req, res) => {

  sensor.read(11, 4, function (err, temperature, humidity) {
    console.log("temp", temperature);
    if (!err) {
      //console.log(`temp: ${temperature}°C, humidity: ${humidity}%`);
      res.json({ 'Celsius': temperature, 'Humidity': humidity });
    }
  });
});

//endpoint to take a pic - created to test upload to s3
app.get('/image', (req, res) => {
  var timestamp = new Date().getTime();
  camera.config.output = `${__dirname}/public/${timestamp}.jpg`;

  camera
    .snap()
    .then((result) => {
      uploadToS3.uploadFile(`${__dirname}/public/${timestamp}.jpg`, config.S3_BUCKET);
      res.json({ 'image': `${camera.config.output}` });
    })
    .catch(err => {
      console.log(err);
    });
});

io.on('connection', (socket) => {
  //send to client (index.html) when connected
  socket.emit('updateClient', update());
  //received from client (index.html)
  socket.on('updateServer', pin => {
    togglePin(pin);
  });
  //CAMERA
  socket.on('takePic', () => {
    takePic();
  });

  socket.on('snapshot', (snapArray) => {
    readFolder();
  });
});

// setInterval(() => {
//   takePic();
// },30000);

//CAMERA
function takePic(value) {
  var timestamp = new Date().getTime();
  camera.config.output = `${__dirname}/public/${timestamp}.jpg`;
  camera
    .snap()
    .then((result) => {
      //let front end know it needs to update
      io.sockets.emit('updatePic', `./${timestamp}.jpg`);
    })
    .catch(err => {
      console.log(err);
    });
}

//student in past class wanted to know how to read all images
//and pass to front end - index.html. she showed all images taken
//not just current
function readFolder() {
  const currentDirectory = path.join(__dirname, 'public');
  let snapShotArray = [];

  fs.readdir(currentDirectory, (err, files) => {
    if (err)
      console.log(err);
    else {
      files.map(file => {
        snapShotArray.push(file);
      })
      io.sockets.emit('folderRead', snapShotArray);
    }
  })
};

function togglePin(pin) {
  pins[pin].writeSync(1 - pins[pin].readSync());
  io.sockets.emit('updateClient', update());
}

function update() {
  return {
    led: pins.led.readSync(),
    lamp: pins.lamp.readSync()
  }
}

const PORT = config.EXPRESS_PORT || 3000;

http.listen(PORT, () => {
  console.log('listening on port 3000');
});


