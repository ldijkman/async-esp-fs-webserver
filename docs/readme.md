
# The Art of Time Controlled

Simple Easy Upload to 4mb ESP8266 / 4mb ESP32 from Browser.

--- 

## Flash 4mb ESP8266 or ESP32 from InBrowser

## https://ldijkman.github.io/async-esp-fs-webserver/

---

code not fully working yet
helpme?

- https://github.com/cotestatnt/async-esp-fs-webserver/issues/28

arduino ide source

https://github.com/ldijkman/async-esp-fs-webserver/blob/master/docs/simpleServerwithwebsocket.ino


![Screenshot from 2024-02-11 11-16-47](https://github.com/ldijkman/async-esp-fs-webserver/assets/45427770/607b52b9-51d9-41c2-8d0a-fd53413513da)


![Screenshot from 2024-02-11 17-01-21](https://github.com/ldijkman/async-esp-fs-webserver/assets/45427770/7a397514-bb32-4ce3-920f-a75252986527)


![Screenshot from 2024-02-11 17-01-30](https://github.com/ldijkman/async-esp-fs-webserver/assets/45427770/bbd9ac93-9a0c-4f44-a767-e9a7633c88aa)

![Screenshot from 2024-02-11 17-01-38](https://github.com/ldijkman/async-esp-fs-webserver/assets/45427770/c0bbf158-2975-42b5-9f90-b8e7d4b3e5cc)

The Art of Time Controlled. Visual TimeSlots Schedule.<br>
<br>
https://plnkr.co/edit/ikOuTjDZvqbPR5jr?preview

https://codepen.io/ldijkman/pen/LYaOgvW

https://jsfiddle.net/luberth/9cLvhm5y/

<br>

![Screenshot from 2024-02-11 08-49-58](https://github.com/ldijkman/async-esp-fs-webserver/assets/45427770/6a2095b5-aa0f-4a00-99d2-d497e0caa839)

The Art of Time Controlled. Visual TimeSlots Schedule.<br>
<br>
https://plnkr.co/edit/ikOuTjDZvqbPR5jr?preview

https://codepen.io/ldijkman/pen/LYaOgvW

https://jsfiddle.net/luberth/9cLvhm5y/

<br>

### also can edit config from ace editor
http://garage.local/edit

![Screenshot from 2024-02-12 05-07-34](https://github.com/ldijkman/async-esp-fs-webserver/assets/45427770/8b023c65-aebe-46e6-98ad-880a15215110)

### http://garage.local/edit
also can edit config from ace editor

---

mDNS scan, list other mdns devices in the network

living.local  kitchen.local

![Screenshot from 2024-02-17 20-05-40](https://github.com/ldijkman/async-esp-fs-webserver/assets/45427770/09ea021c-41a5-4a11-a789-128bd30c2d33)


https://ldijkman.github.io/async-esp-fs-webserver/WebSerialMonitor.html


![Screenshot from 2024-02-17 20-21-00](https://github.com/ldijkman/async-esp-fs-webserver/assets/45427770/72cbb512-9ac1-436b-9349-3b97d3c150b2)


---

links in webserial monitor are clickable when it starts with http

maybe i should start ip and mdns with http:// so that it is clickable

https://ldijkman.github.io/async-esp-fs-webserver/WebSerialMonitor.html

![Screenshot from 2024-02-18 00-01-02](https://github.com/ldijkman/async-esp-fs-webserver/assets/45427770/8ffd31d0-6689-4c3d-884a-ea0baf632a1c)

---

links in webserial monitor are clickable when it starts with http

maybe i should start ip and mdns with http:// so that it is clickable

![Screenshot from 2024-02-20 05-38-13](https://github.com/ldijkman/async-esp-fs-webserver/assets/45427770/0967d4f2-206b-421e-91fa-8ee1f58dc040)

---

links in webserial monitor are clickable when it starts with http

maybe i should start ip and mdns with http:// so that it is clickable

![Screenshot from 2024-02-20 05-37-53](https://github.com/ldijkman/async-esp-fs-webserver/assets/45427770/080388ae-acf5-4b2e-9bee-a5acf3b082be)


---

### drag search replace to a desired position, not static upper right corner

## Beat that Microsoft Visual Studio Monaco! ;-)

## Beat that Arduino Monaco IDE2


![Screenshot from 2024-02-20 05-53-44](https://github.com/ldijkman/async-esp-fs-webserver/assets/45427770/e5c3da3b-6ea6-43a5-8e49-f12335be0b77)

## Beat that Arduino Monaco IDE2


links in webserial monitor are clickable links https://ldijkman.github.io/async-esp-fs-webserver/WebSerialMonitor.html

![Screenshot from 2024-02-22 05-57-31](https://github.com/ldijkman/async-esp-fs-webserver/assets/45427770/a1f06b58-437e-4113-869b-673bc2487c97)


links in webserial monitor are clickable links https://ldijkman.github.io/async-esp-fs-webserver/WebSerialMonitor.html



<pre>

  It looks like you're interested in a serverless home automation system using ESP8266 or ESP32 devices. Each device operates its own web server and communicates over the network using mDNS (Multicast DNS), making it possible to interact with them without needing a centralized home automation system like Home Assistant.

Here's a simplified overview of how you can set up such a system:

Step 1: Flashing Your ESP8266/ESP32
Prepare Your Environment: Ensure you have a Chromium-based browser (Google Chrome, Edge, Opera) ready, and all serial connections to the ESP device are closed.

Flash the Firmware: Visit the provided GitHub repository and follow the instructions to flash your ESP8266/ESP32 with the async-esp-fs-webserver firmware. This step involves using the browser to flash the device directly.

GitHub repository with Arduino .ino source: https://github.com/ldijkman/async-esp-fs-webserver/blob/master/docs/simpleServerwithwebsocket.ino
Step 2: Setting Up the Web Server
After flashing, each device runs an ESPAsyncWebServer and includes a filesystem browser and an Ace Editor interface. This setup allows you to easily modify, upload, or delete files on the ESP's web server.

Access Point (AP) Mode: Initially, your ESP device will create its own Wi-Fi Access Point (e.g., "ESP32_AP1234"). Connect your PC or smartphone to this AP.
Configuration: Navigate to http://8.8.8.8/setup on your browser while connected to the ESP's Wi-Fi network to configure the ESP to connect to your home Wi-Fi router.
File Management and Editing: Use http://8.8.8.8/edit to access the built-in Ace Editor, allowing you to edit or upload files directly to the ESP.
Step 3: Using mDNS for Easy Access
Once configured to connect to your home network, the ESP device will be accessible via an mDNS address (e.g., http://garage.local). This simplifies accessing the device without needing to remember its IP address.

Troubleshooting
Wi-Fi Connection Issues: If you encounter issues connecting the ESP to your Wi-Fi network, a reboot of the ESP device might be necessary.
Accessing the Device: If mDNS does not resolve, you may need to use the ESP's IP address directly. This can typically be found on your router's device list.
Additional Notes
Browser-Based Serial Monitor: The project provides a Chromium browser-based serial monitor (WebSerialMonitor) for debugging and monitoring output from the ESP devices.
In-Browser Flashing: The system supports flashing ESP devices directly from the browser, simplifying the initial setup process.
This setup offers a flexible and user-friendly approach to DIY home automation, allowing for direct web-based interaction with each device and the ability to easily customize the web server's files and functionality.
  
</pre>

--- 

## Flash 4mb ESP8266 or ESP32 from InBrowser

## https://ldijkman.github.io/async-esp-fs-webserver/

---







