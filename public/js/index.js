var socket = io();

socket.on('updateClient', data => {
   // var lamp = document.getElementById("lamp");
    var led = document.getElementById("led");

   // (data.lamp  === 0 ? (lamp.innerHTML = "Lamp Off", lamp.style.color = "#fff") :
   //     (lamp.innerHTML = "Lamp On", lamp.style.color = "#ffff00"));

    (data.led === 0 ? (led.innerHTML = "Turn on", led.style.color = "#fff") :
        (led.innerHTML = "Turn off", led.style.color = "#ffff00"));
});
socket.on('updatePic', file  => {
  document.getElementById("pic").src = file;
});
//socket.on('folderRead', data => {
   //console.log(data);
//});

//CAMERA
function toggle(pin) {
    socket.emit('updateServer', pin);
}
//CAMERA
function takePic(){
    socket.emit('takePic');
}
//function readFolder() {
    //socket.emit("snapshot");
//}





