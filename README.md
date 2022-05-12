# RaspberryPiServerWithCamera
--
## Video overview
https://www.screencast.com/t/YSYy40RWjRbI

## Note: 
Follow instructions here to get set up if necessary. Just clone this repo instead of the RaspberryPiServer repo.

All other steps will be the same.  
https://github.com/prichardsondev/RaspberryPiServer

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
