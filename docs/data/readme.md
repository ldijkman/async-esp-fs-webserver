content for littlefs

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
```


---


```
[LittleFS] data    : /home/pi/Arduino/sketch_feb10a/data
[LittleFS] size    : 64
[LittleFS] page    : 256
[LittleFS] block   : 4096
/time.html
/index.html
lfs warn:475: No more free space 20
lfs_write error(-28): File system is full.

error adding file!

LittleFS Create Failed!
[LittleFS] data    : /home/pi/Arduino/sketch_feb10a/data
[LittleFS] size    : 1000
[LittleFS] page    : 256
[LittleFS] block   : 8192
/time.html
/index.html
/index.htm
[LittleFS] upload  : /tmp/arduino_build_562973/sketch_feb10a.mklittlefs.bin
[LittleFS] address : 0x300000
[LittleFS] reset   : --before default_reset --after hard_reset
[LittleFS] port    : /dev/ttyUSB0
[LittleFS] speed   : 115200
[LittleFS] python   : /home/pi/.arduino15/packages/esp8266/tools/python3/3.7.2-post1/python3
[LittleFS] uploader : /home/pi/.arduino15/packages/esp8266/hardware/esp8266/2.7.4/tools/upload.py

esptool.py v2.8
Serial port /dev/ttyUSB0
Connecting....
Chip is ESP8266EX
Features: WiFi
Crystal is 26MHz
MAC: 3c:71:bf:37:56:96
Uploading stub...
Running stub...
Stub running...
Configuring flash size...
Auto-detected Flash size: 4MB
Compressed 1024000 bytes to 46464...
Wrote 1024000 bytes (46464 compressed) at 0x00300000 in 4.5 seconds (effective 1839.7 kbit/s)...
Hash of data verified.

Leaving...
Hard resetting via RTS pin...
[LittleFS] data    : /home/pi/Arduino/sketch_feb10a/data
[LittleFS] size    : 2024
[LittleFS] page    : 256
[LittleFS] block   : 8192
/time.html
/index.html
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
Connecting....
Chip is ESP8266EX
Features: WiFi
Crystal is 26MHz
MAC: 3c:71:bf:37:56:96
Uploading stub...
Running stub...
Stub running...
Configuring flash size...
Auto-detected Flash size: 4MB
Compressed 2072576 bytes to 48737...
Wrote 2072576 bytes (48737 compressed) at 0x00200000 in 6.3 seconds (effective 2633.1 kbit/s)...
Hash of data verified.

Leaving...
Hard resetting via RTS pin...
[SPIFFS] data    : /home/pi/Arduino/sketch_feb10a/data
[SPIFFS] size    : 2024
[SPIFFS] page    : 256
[SPIFFS] block   : 8192
/time.html
/index.html
/ledtest.html
/index.htm
[SPIFFS] upload  : /tmp/arduino_build_562973/sketch_feb10a.spiffs.bin
[SPIFFS] address  : 0x200000
[SPIFFS] reset    : --before default_reset --after hard_reset
[SPIFFS] port     : /dev/ttyUSB0
[SPIFFS] speed    : 115200
[SPIFFS] python   : /home/pi/.arduino15/packages/esp8266/tools/python3/3.7.2-post1/python3
[SPIFFS] uploader : /home/pi/.arduino15/packages/esp8266/hardware/esp8266/2.7.4/tools/upload.py

esptool.py v2.8
Serial port /dev/ttyUSB0
Connecting....
Chip is ESP8266EX
Features: WiFi
Crystal is 26MHz
MAC: c8:c9:a3:69:a8:37
Uploading stub...
Running stub...
Stub running...
Configuring flash size...
Auto-detected Flash size: 4MB
Compressed 2072576 bytes to 73649...
Wrote 2072576 bytes (73649 compressed) at 0x00200000 in 6.5 seconds (effective 2539.2 kbit/s)...
Hash of data verified.

Leaving...
Hard resetting via RTS pin...
[LittleFS] data    : /home/pi/Arduino/sketch_feb10a/data
[LittleFS] size    : 2024
[LittleFS] page    : 256
[LittleFS] block   : 8192
/time.html
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
Connecting....
Chip is ESP8266EX
Features: WiFi
Crystal is 26MHz
MAC: c8:c9:a3:69:a8:37
Uploading stub...
Running stub...
Stub running...
Configuring flash size...
Auto-detected Flash size: 4MB
Compressed 2072576 bytes to 49591...
Wrote 2072576 bytes (49591 compressed) at 0x00200000 in 10.9 seconds (effective 1527.3 kbit/s)...
Hash of data verified.

Leaving...
Hard resetting via RTS pin...
[LittleFS] data    : /home/pi/Arduino/sketch_feb10a/data
[LittleFS] size    : 2024
[LittleFS] page    : 256
[LittleFS] block   : 8192
/time.html
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
Connecting....
Chip is ESP8266EX
Features: WiFi
Crystal is 26MHz
MAC: c8:c9:a3:69:a8:37
Uploading stub...
Running stub...
Stub running...
Configuring flash size...
Auto-detected Flash size: 4MB
Compressed 2072576 bytes to 55436...
Wrote 2072576 bytes (55436 compressed) at 0x00200000 in 6.8 seconds (effective 2427.7 kbit/s)...
Hash of data verified.

Leaving...
Hard resetting via RTS pin...
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
Connecting....
Chip is ESP8266EX
Features: WiFi
Crystal is 26MHz
MAC: c8:c9:a3:69:a8:37
Uploading stub...
Running stub...
Stub running...
Configuring flash size...
Auto-detected Flash size: 4MB
Compressed 2072576 bytes to 56419...
Wrote 2072576 bytes (56419 compressed) at 0x00200000 in 6.5 seconds (effective 2564.3 kbit/s)...
Hash of data verified.

Leaving...
Hard resetting via RTS pin...
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
Connecting....
Chip is ESP8266EX
Features: WiFi
Crystal is 26MHz
MAC: c8:c9:a3:69:a8:37
Uploading stub...
Running stub...
Stub running...
Configuring flash size...
Auto-detected Flash size: 4MB
Compressed 2072576 bytes to 56680...
Wrote 2072576 bytes (56680 compressed) at 0x00200000 in 6.6 seconds (effective 2524.3 kbit/s)...
Hash of data verified.

Leaving...
Hard resetting via RTS pin...
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
Traceback (most recent call last):
  File "/home/pi/.arduino15/packages/esp8266/hardware/esp8266/2.7.4/tools/pyserial/serial/serialposix.py", line 265, in open
    self.fd = os.open(self.portstr, os.O_RDWR | os.O_NOCTTY | os.O_NONBLOCK)
FileNotFoundError: [Errno 2] No such file or directory: '/dev/ttyUSB0'

During handling of the above exception, another exception occurred:

Traceback (most recent call last):
  File "/home/pi/.arduino15/packages/esp8266/hardware/esp8266/2.7.4/tools/upload.py", line 65, in <module>
    esptool.main(cmdline)
  File "/home/pi/.arduino15/packages/esp8266/hardware/esp8266/2.7.4/tools/esptool/esptool.py", line 2889, in main
    esp = chip_class(each_port, initial_baud, args.trace)
  File "/home/pi/.arduino15/packages/esp8266/hardware/esp8266/2.7.4/tools/esptool/esptool.py", line 237, in __init__
    self._port = serial.serial_for_url(port)
  File "/home/pi/.arduino15/packages/esp8266/hardware/esp8266/2.7.4/tools/pyserial/serial/__init__.py", line 88, in serial_for_url
    instance.open()
  File "/home/pi/.arduino15/packages/esp8266/hardware/esp8266/2.7.4/tools/pyserial/serial/serialposix.py", line 268, in open
    raise SerialException(msg.errno, "could not open port {}: {}".format(self._port, msg))
serial.serialutil.SerialException: [Errno 2] could not open port /dev/ttyUSB0: [Errno 2] No such file or directory: '/dev/ttyUSB0'
LittleFS Upload failed!
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
Traceback (most recent call last):
  File "/home/pi/.arduino15/packages/esp8266/hardware/esp8266/2.7.4/tools/pyserial/serial/serialposix.py", line 265, in open
    self.fd = os.open(self.portstr, os.O_RDWR | os.O_NOCTTY | os.O_NONBLOCK)
FileNotFoundError: [Errno 2] No such file or directory: '/dev/ttyUSB0'

During handling of the above exception, another exception occurred:

Traceback (most recent call last):
  File "/home/pi/.arduino15/packages/esp8266/hardware/esp8266/2.7.4/tools/upload.py", line 65, in <module>
    esptool.main(cmdline)
  File "/home/pi/.arduino15/packages/esp8266/hardware/esp8266/2.7.4/tools/esptool/esptool.py", line 2889, in main
    esp = chip_class(each_port, initial_baud, args.trace)
  File "/home/pi/.arduino15/packages/esp8266/hardware/esp8266/2.7.4/tools/esptool/esptool.py", line 237, in __init__
    self._port = serial.serial_for_url(port)
  File "/home/pi/.arduino15/packages/esp8266/hardware/esp8266/2.7.4/tools/pyserial/serial/__init__.py", line 88, in serial_for_url
    instance.open()
  File "/home/pi/.arduino15/packages/esp8266/hardware/esp8266/2.7.4/tools/pyserial/serial/serialposix.py", line 268, in open
    raise SerialException(msg.errno, "could not open port {}: {}".format(self._port, msg))
serial.serialutil.SerialException: [Errno 2] could not open port /dev/ttyUSB0: [Errno 2] No such file or directory: '/dev/ttyUSB0'
LittleFS Upload failed!
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
Traceback (most recent call last):
  File "/home/pi/.arduino15/packages/esp8266/hardware/esp8266/2.7.4/tools/pyserial/serial/serialposix.py", line 265, in open
    self.fd = os.open(self.portstr, os.O_RDWR | os.O_NOCTTY | os.O_NONBLOCK)
FileNotFoundError: [Errno 2] No such file or directory: '/dev/ttyUSB0'

During handling of the above exception, another exception occurred:

Traceback (most recent call last):
  File "/home/pi/.arduino15/packages/esp8266/hardware/esp8266/2.7.4/tools/upload.py", line 65, in <module>
    esptool.main(cmdline)
  File "/home/pi/.arduino15/packages/esp8266/hardware/esp8266/2.7.4/tools/esptool/esptool.py", line 2889, in main
    esp = chip_class(each_port, initial_baud, args.trace)
  File "/home/pi/.arduino15/packages/esp8266/hardware/esp8266/2.7.4/tools/esptool/esptool.py", line 237, in __init__
    self._port = serial.serial_for_url(port)
  File "/home/pi/.arduino15/packages/esp8266/hardware/esp8266/2.7.4/tools/pyserial/serial/__init__.py", line 88, in serial_for_url
    instance.open()
  File "/home/pi/.arduino15/packages/esp8266/hardware/esp8266/2.7.4/tools/pyserial/serial/serialposix.py", line 268, in open
    raise SerialException(msg.errno, "could not open port {}: {}".format(self._port, msg))
serial.serialutil.SerialException: [Errno 2] could not open port /dev/ttyUSB0: [Errno 2] No such file or directory: '/dev/ttyUSB0'
LittleFS Upload failed!
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
Traceback (most recent call last):
  File "/home/pi/.arduino15/packages/esp8266/hardware/esp8266/2.7.4/tools/pyserial/serial/serialposix.py", line 265, in open
    self.fd = os.open(self.portstr, os.O_RDWR | os.O_NOCTTY | os.O_NONBLOCK)
FileNotFoundError: [Errno 2] No such file or directory: '/dev/ttyUSB0'

During handling of the above exception, another exception occurred:

Traceback (most recent call last):
  File "/home/pi/.arduino15/packages/esp8266/hardware/esp8266/2.7.4/tools/upload.py", line 65, in <module>
    esptool.main(cmdline)
  File "/home/pi/.arduino15/packages/esp8266/hardware/esp8266/2.7.4/tools/esptool/esptool.py", line 2889, in main
    esp = chip_class(each_port, initial_baud, args.trace)
  File "/home/pi/.arduino15/packages/esp8266/hardware/esp8266/2.7.4/tools/esptool/esptool.py", line 237, in __init__
    self._port = serial.serial_for_url(port)
  File "/home/pi/.arduino15/packages/esp8266/hardware/esp8266/2.7.4/tools/pyserial/serial/__init__.py", line 88, in serial_for_url
    instance.open()
  File "/home/pi/.arduino15/packages/esp8266/hardware/esp8266/2.7.4/tools/pyserial/serial/serialposix.py", line 268, in open
    raise SerialException(msg.errno, "could not open port {}: {}".format(self._port, msg))
serial.serialutil.SerialException: [Errno 2] could not open port /dev/ttyUSB0: [Errno 2] No such file or directory: '/dev/ttyUSB0'
LittleFS Upload failed!
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
Traceback (most recent call last):
  File "/home/pi/.arduino15/packages/esp8266/hardware/esp8266/2.7.4/tools/pyserial/serial/serialposix.py", line 265, in open
    self.fd = os.open(self.portstr, os.O_RDWR | os.O_NOCTTY | os.O_NONBLOCK)
FileNotFoundError: [Errno 2] No such file or directory: '/dev/ttyUSB0'

During handling of the above exception, another exception occurred:

Traceback (most recent call last):
  File "/home/pi/.arduino15/packages/esp8266/hardware/esp8266/2.7.4/tools/upload.py", line 65, in <module>
    esptool.main(cmdline)
  File "/home/pi/.arduino15/packages/esp8266/hardware/esp8266/2.7.4/tools/esptool/esptool.py", line 2889, in main
    esp = chip_class(each_port, initial_baud, args.trace)
  File "/home/pi/.arduino15/packages/esp8266/hardware/esp8266/2.7.4/tools/esptool/esptool.py", line 237, in __init__
    self._port = serial.serial_for_url(port)
  File "/home/pi/.arduino15/packages/esp8266/hardware/esp8266/2.7.4/tools/pyserial/serial/__init__.py", line 88, in serial_for_url
    instance.open()
  File "/home/pi/.arduino15/packages/esp8266/hardware/esp8266/2.7.4/tools/pyserial/serial/serialposix.py", line 268, in open
    raise SerialException(msg.errno, "could not open port {}: {}".format(self._port, msg))
serial.serialutil.SerialException: [Errno 2] could not open port /dev/ttyUSB0: [Errno 2] No such file or directory: '/dev/ttyUSB0'
LittleFS Upload failed!
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
LittleFS Upload failed!
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
LittleFS Upload failed!
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
Traceback (most recent call last):
  File "/home/pi/.arduino15/packages/esp8266/hardware/esp8266/2.7.4/tools/pyserial/serial/serialposix.py", line 265, in open
    self.fd = os.open(self.portstr, os.O_RDWR | os.O_NOCTTY | os.O_NONBLOCK)
FileNotFoundError: [Errno 2] No such file or directory: '/dev/ttyUSB0'

During handling of the above exception, another exception occurred:

Traceback (most recent call last):
  File "/home/pi/.arduino15/packages/esp8266/hardware/esp8266/2.7.4/tools/upload.py", line 65, in <module>
    esptool.main(cmdline)
  File "/home/pi/.arduino15/packages/esp8266/hardware/esp8266/2.7.4/tools/esptool/esptool.py", line 2889, in main
    esp = chip_class(each_port, initial_baud, args.trace)
  File "/home/pi/.arduino15/packages/esp8266/hardware/esp8266/2.7.4/tools/esptool/esptool.py", line 237, in __init__
    self._port = serial.serial_for_url(port)
  File "/home/pi/.arduino15/packages/esp8266/hardware/esp8266/2.7.4/tools/pyserial/serial/__init__.py", line 88, in serial_for_url
    instance.open()
  File "/home/pi/.arduino15/packages/esp8266/hardware/esp8266/2.7.4/tools/pyserial/serial/serialposix.py", line 268, in open
    raise SerialException(msg.errno, "could not open port {}: {}".format(self._port, msg))
serial.serialutil.SerialException: [Errno 2] could not open port /dev/ttyUSB0: [Errno 2] No such file or directory: '/dev/ttyUSB0'
LittleFS Upload failed!
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
Traceback (most recent call last):
  File "/home/pi/.arduino15/packages/esp8266/hardware/esp8266/2.7.4/tools/pyserial/serial/serialposix.py", line 265, in open
    self.fd = os.open(self.portstr, os.O_RDWR | os.O_NOCTTY | os.O_NONBLOCK)
FileNotFoundError: [Errno 2] No such file or directory: '/dev/ttyUSB0'

During handling of the above exception, another exception occurred:

Traceback (most recent call last):
  File "/home/pi/.arduino15/packages/esp8266/hardware/esp8266/2.7.4/tools/upload.py", line 65, in <module>
    esptool.main(cmdline)
  File "/home/pi/.arduino15/packages/esp8266/hardware/esp8266/2.7.4/tools/esptool/esptool.py", line 2889, in main
    esp = chip_class(each_port, initial_baud, args.trace)
  File "/home/pi/.arduino15/packages/esp8266/hardware/esp8266/2.7.4/tools/esptool/esptool.py", line 237, in __init__
    self._port = serial.serial_for_url(port)
  File "/home/pi/.arduino15/packages/esp8266/hardware/esp8266/2.7.4/tools/pyserial/serial/__init__.py", line 88, in serial_for_url
    instance.open()
  File "/home/pi/.arduino15/packages/esp8266/hardware/esp8266/2.7.4/tools/pyserial/serial/serialposix.py", line 268, in open
    raise SerialException(msg.errno, "could not open port {}: {}".format(self._port, msg))
serial.serialutil.SerialException: [Errno 2] could not open port /dev/ttyUSB0: [Errno 2] No such file or directory: '/dev/ttyUSB0'
LittleFS Upload failed!
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
LittleFS Upload failed!

```
