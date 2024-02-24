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
_>Traceback (most recent call last):
_>  File "/usr/lib/python3/dist-packages/serial/serialposix.py", line 265, in open
_>    self.fd = os.open(self.portstr, os.O_RDWR | os.O_NOCTTY | os.O_NONBLOCK)
_>FileNotFoundError: [Errno 2] No such file or directory: '/dev/ttyUSB0'
_>
_>During handling of the above exception, another exception occurred:
_>
_>Traceback (most recent call last):
_>  File "/home/pi/.arduino15/packages/esp32/hardware/esp32/1.0.6/tools/esptool.py", line 3470, in <module>
_>    _main()
_>  File "/home/pi/.arduino15/packages/esp32/hardware/esp32/1.0.6/tools/esptool.py", line 3463, in _main
_>    main()
_>  File "/home/pi/.arduino15/packages/esp32/hardware/esp32/1.0.6/tools/esptool.py", line 3127, in main
_>    esp = chip_class(each_port, initial_baud, args.trace)
_>  File "/home/pi/.arduino15/packages/esp32/hardware/esp32/1.0.6/tools/esptool.py", line 268, in __init__
_>    self._port = serial.serial_for_url(port)
_>  File "/usr/lib/python3/dist-packages/serial/__init__.py", line 88, in serial_for_url
_>    instance.open()
_>  File "/usr/lib/python3/dist-packages/serial/serialposix.py", line 268, in open
_>    raise SerialException(msg.errno, "could not open port {}: {}".format(self._port, msg))
_>serial.serialutil.SerialException: [Errno 2] could not open port /dev/ttyUSB0: [Errno 2] No such file or directory: '/dev/ttyUSB0'
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
