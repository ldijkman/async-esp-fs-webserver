# Adafruit WebSerial ESPTool
.
# https://ldijkman.github.io/async-esp-fs-webserver/Oh_Melissa/index.html

maybe if you connect you can see what your ESP is

```
ESP Web Flasher loaded.
Connecting...
Connected successfully.
Try hard reset.
Chip type ESP32
Connected to ESP32
MAC Address: 7C:9E:BD:F2:F7:4C
Uploading stub...
Running stub...
Stub is now running...
Detecting Flash Size
FlashId: 0x1640D8
Flash Manufacturer: d8
Flash Device: 4016
Auto-detected Flash size: 4MB

```
![Screenshot from 2024-02-25 15-37-03](https://github.com/ldijkman/async-esp-fs-webserver/assets/45427770/0776df87-f724-4234-aa16-6cc28e1c31ed)

.
.
.

.


.
.
.

.
.
.
JavaScript package to install firmware on ESP devices via the browser using WebSerial.

## Used by

- [Adafruit WipperSnapper](https://learn.adafruit.com/quickstart-adafruit-io-wippersnapper)
- [Adafruit CircuitPython Installer](https://circuitpython.org/downloads/)

## Local development

- Clone this repository.
- Install dependencies with `npm`
- Run `script/develop`
- Open http://localhost:5004/

## Origin

This project was originally written by [Melissa LeBlanc-Williams](https://github.com/makermelissa). [Nabu Casa](https://www.nabucasa.com) ported the code over to TypeScript and in March 2022 took over maintenance from Adafruit. In July 2022, the Nabucasa stopped maintaining the project in favor of an official, but very early release of Espressif's [esptool-js](https://github.com/espressif/esptool-js/). Due to the instability of the tool, Adafruit updated their fork with Nabucasa's changes in November 2022 and took over maintenance once again.


A live copy of the tool is hosted here: https://adafruit.github.io/Adafruit_WebSerial_ESPTool/
