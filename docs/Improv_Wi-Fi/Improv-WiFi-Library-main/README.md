improv wifi serial usb is an easy way to
- configure your ESP with SSID PassWord to connect it to your home network wifi router
- SSID is the name that your wifi router broadcasts in the Air
- password is your password to connect the ESP to the home wifi network


# Improv WiFi Library
### https://github.com/jnthas/Improv-WiFi-Library/tree/main

Improv is a free and open standard with ready-made SDKs that offer a great user experience to configure Wi-Fi on devices. More details [here](https://www.improv-wifi.com/).

This library provides an easier way to handle the Improv serial protocol in your firmware, allowing you to configure the WiFi via web browser as in the following [example](https://jnthas.github.io/improv-wifi-demo/).

Simplest use example:

```cpp
#include <ImprovWiFiLibrary.h>

ImprovWiFi improvSerial(&Serial);

void setup() {
  improvSerial.setDeviceInfo(ImprovTypes::ChipFamily::CF_ESP32, "My-Device-9a4c2b", "2.1.5", "My Device");
}

void loop() { 
  improvSerial.handleSerial();
}
```

## Documentation

The full library documentation can be seen in [docs/](docs/readme.md) folder.


## License

This open source code is licensed under the MIT license (see [LICENSE](LICENSE)
for details).



![2024-02-26-022712_1024x768_scrot](https://github.com/ldijkman/async-esp-fs-webserver/assets/45427770/7d49222c-73e5-43be-8897-1b8bd03a3287)

![2024-02-26-022951_1024x768_scrot](https://github.com/ldijkman/async-esp-fs-webserver/assets/45427770/309390e5-b293-4fc7-8f89-94b27f70cdad)


![Screenshot from 2024-02-26 02-09-11](https://github.com/ldijkman/async-esp-fs-webserver/assets/45427770/5f3921d0-9d66-462f-9608-af1fb569b03f)

![Screenshot from 2024-02-26 02-10-08](https://github.com/ldijkman/async-esp-fs-webserver/assets/45427770/d4941eb3-327e-4dd1-bc79-0207c836b64c)

![Screenshot from 2024-02-26 02-10-19](https://github.com/ldijkman/async-esp-fs-webserver/assets/45427770/2285ab00-676a-4205-90bb-0a31869ca3b8)

![Screenshot from 2024-02-26 02-10-38](https://github.com/ldijkman/async-esp-fs-webserver/assets/45427770/fba31497-f381-401b-8bbb-b713cb353a58)

![Screenshot from 2024-02-26 02-10-47](https://github.com/ldijkman/async-esp-fs-webserver/assets/45427770/a8dfdc3e-36b1-4ccf-8e64-c953dc25a81a)

![Screenshot from 2024-02-26 02-12-42](https://github.com/ldijkman/async-esp-fs-webserver/assets/45427770/33ca7401-c910-422a-bfa0-22de5d74fd9f)




