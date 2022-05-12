# RaspberryPiServerWithCamera
--
## Video overview
https://www.screencast.com/t/YSYy40RWjRbI

## Note: 
Follow instructions here to get set up if necessary. Just clone this repo instead of the RaspberryPiServer repo.

All other steps will be the same.  
https://github.com/prichardsondev/RaspberryPiServer

## Install awscli

```
$ sudo apt-get install awscli

$ aws --version
aws-cli/1.22.7 Python/3.9.2 Linux/5.10.63-v7l+ botocore/1.23.7

$ aws configure --profile yourprofile
AWS Access Key ID [None]: youraccesskey
AWS Secret Access Key [None]: yoursecretkey
Default region name [None]: us-east-1
Default output format [None]: json

$ aws s3 ls --profile yourprofile
```
## connect DHT 11 temp sensor to Raspberry PI
| Sensor Pin   | PI  Pin  |
|--------------|----------|
|      -       | Ground   |
|      +       | 5V       |
|     out      | GPIO 4   |

### config.js
- Modify config.js
- Replace CLIENT,MACHINE_ID,TABLE_NAME,S3_BUCKET
- Replace PROFILE value if using profile other than default
```
module.exports = {
    EXPRESS_PORT:"3000",
    CLIENT:"PRICHARDSON",
    MACHINE_ID:"01",
    TABLE_NAME:"yourawstablename",
    S3_BUCKET:"yourawsbucketname",
    PROFILE:"default"
}
```
