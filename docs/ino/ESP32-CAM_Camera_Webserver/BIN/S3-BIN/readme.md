
python3 "/home/dld/.arduino15/packages/esp32/tools/esptool_py/4.5.1/esptool.py" 
--chip esp32s3 
--port "/dev/ttyACM0" 
--baud 921600  
--before default_reset 
--after hard_reset write_flash  -z --flash_mode dio --flash_freq 80m --flash_size 16MB 
0x0 
"/home/dld/.var/app/cc.arduino.IDE2/cache/arduino/sketches/90298628DC63E809DCB6506E5B112ABF/ESP32-CAM_MJPEG2SD_S3_Wroom.ino.bootloader.bin" 
0x8000 
"/home/dld/.var/app/cc.arduino.IDE2/cache/arduino/sketches/90298628DC63E809DCB6506E5B112ABF/ESP32-CAM_MJPEG2SD_S3_Wroom.ino.partitions.bin" 
0xe000 
"/home/dld/.arduino15/packages/esp32/hardware/esp32/2.0.14/tools/partitions/boot_app0.bin" 
0x10000 
"/home/dld/.var/app/cc.arduino.IDE2/cache/arduino/sketches/90298628DC63E809DCB6506E5B112ABF/ESP32-CAM_MJPEG2SD_S3_Wroom.ino.bin" 


![Screenshot from 2024-04-20 21-25-50](https://github.com/ldijkman/async-esp-fs-webserver/assets/45427770/ba905c0f-3261-41ee-b886-ada761b23857)


Erase
Program
ESP Web Flasher loaded.
Connecting...
Connected successfully.
Try hard reset.
Error: Failed to execute 'setSignals' on 'SerialPort': Failed to set control signals.
Connecting...
Connected successfully.
Try hard reset.
Chip type ESP32-S3
Connected to ESP32-S3
MAC Address: 24:58:7C:DA:60:F0
Uploading stub...
Running stub...
Stub is now running...
Detecting Flash Size
FlashId: 0x182085
Flash Manufacturer: 85
Flash Device: 2018
Auto-detected Flash size: 16MB
Erasing flash memory. Please wait...
Finished. Took 33104ms to erase.
Image header, Magic=0xE9, FlashMode=0x02, FlashSizeFreq=0x3F
Writing data with filesize: 15104
Erase size 15104, blocks 1, block size 0x4000, offset 0x1000, encrypted no
Took 1508ms to write 15104 bytes
Erase size 0, blocks 0, block size 0x4000, offset 0x0000, encrypted no
Image header, Magic=0xAA, FlashMode=0x01, FlashSizeFreq=0x02
Writing data with filesize: 3072
Erase size 3072, blocks 1, block size 0x4000, offset 0x8000, encrypted no
Took 1434ms to write 3072 bytes
Erase size 0, blocks 0, block size 0x4000, offset 0x0000, encrypted no
Image header, Magic=0xE9, FlashMode=0x02, FlashSizeFreq=0x3F
Writing data with filesize: 1534448
Erase size 1534448, blocks 94, block size 0x4000, offset 0x10000, encrypted no
Took 136730ms to write 1534448 bytes
Erase size 0, blocks 0, block size 0x4000, offset 0x0000, encrypted no
To run the new firmware, please reset your device.
