content for littlefs

---

think this  for esp32
```
Chip : esp32
Using partition scheme from Arduino IDE.
Start: 0x290000
Size : 0x170000
mklittlefs : /home/pi/.arduino15/packages/esp8266/tools/mklittlefs/2.5.0-4-fe5bb56/mklittlefs

esptool : /home/pi/.arduino15/packages/esp32/hardware/esp32/1.0.6/tools/esptool.py

[LittleFS] data   : /home/pi/Arduino/sketch_feb10a/data
[LittleFS] offset : 0
[LittleFS] start  : 2686976
[LittleFS] size   : 1472
[LittleFS] page   : 256
[LittleFS] block  : 4096
->/time.html
->/mdns.html
->/ace.html
->/index.html
->/ledtest.html
->/index.htm
[LittleFS] upload : /tmp/arduino_build_562973/sketch_feb10a.littlefs.bin
[LittleFS] address: 2686976
[LittleFS] port   : /dev/ttyUSB0
[LittleFS] speed  : 921600
[LittleFS] mode   : dio
[LittleFS] freq   : 80m

->esptool.py v2.9-dev
->Serial port /dev/ttyUSB0
```










---
think this for esp8266
```
[LittleFS] data    : /home/pi/Arduino/sketch_feb10a/data
[LittleFS] size    : 2024
[LittleFS] page    : 256
[LittleFS] block   : 8192
/time.html
/mdns.html
/ace.html
/index.html
/ledtest.html
/index.htm
[LittleFS] upload  : /tmp/arduino_build_562973/sketch_feb10a.mklittlefs.bin
[LittleFS] address : 0x200000
[LittleFS] reset   : --before default_reset --after hard_reset
[LittleFS] port    : /dev/ttyUSB0
[LittleFS] speed   : 115200
[LittleFS] python   : /home/pi/.arduino15/packages/esp8266/tools/python3/3.7.2-post1/python3
[LittleFS] uploader : /home/pi/.arduino15/packages/esp8266/hardware/esp8266/2.7.4/tools/upload.py

esptool.py v2.8
Serial port /dev/ttyUSB0

```
