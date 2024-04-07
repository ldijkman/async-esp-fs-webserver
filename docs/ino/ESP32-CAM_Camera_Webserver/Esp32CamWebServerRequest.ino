// https://github.com/PeterNV/ESP32-CAM-WEB-SERVER-REQUEST/blob/main/Esp32CamWebServerRequest.ino


#include <WiFi.h>
#include <ESPAsyncWebSrv.h>
#include <AsyncTCP.h>
#include "esp_camera.h"
#include "Arduino.h"
#include "twilio.hpp"

const char * SSID = "REPLACE_WITH_YOUR_SSID";
const char * PASSWORD = "REPLACE_WITH_YOUR_PASSWORD";

#define PWDN_GPIO_NUM     32
#define RESET_GPIO_NUM    -1
#define XCLK_GPIO_NUM      0
#define SIOD_GPIO_NUM     26
#define SIOC_GPIO_NUM     27
#define Y9_GPIO_NUM       35
#define Y8_GPIO_NUM       34
#define Y7_GPIO_NUM       39
#define Y6_GPIO_NUM       36
#define Y5_GPIO_NUM       21
#define Y4_GPIO_NUM       19
#define Y3_GPIO_NUM       18
#define Y2_GPIO_NUM        5
#define VSYNC_GPIO_NUM    25
#define HREF_GPIO_NUM     23
#define PCLK_GPIO_NUM     22

const char index_html[] PROGMEM = R"rawliteral(
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.6/umd/popper.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/js/bootstrap.min.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <style>
        body {
            text-align: center;
        }
        #stream {
            max-width: 100%; 
            height: auto;
            scale: 4.0;
            position: absolute;
            bottom: 50%;
            border: 2px solid gray;
            border-radius: 5%;
        }
        #fps{
       
            scale: 4.0;
            position: absolute;
            bottom: 25%;
           
        }
    </style>
</head>
<body>

    <div class="container">
        <img id="stream"><br>
        <input type="range" id="fps" min="50" max="200" onchange="MudarFPS()">
    </div>
    
    <script>
        var fps = 50;
        var myInterval = setInterval(rodar, fps);
        function rodar() {
            const reqCam = new XMLHttpRequest();
            reqCam.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    document.getElementById("stream").src = "data:image/jpeg;base64," + reqCam.responseText;
                    
                }
            }
            reqCam.open('GET', '/cam', true);
            reqCam.send();
        }
         function MudarFPS() {
                fps = document.getElementById("fps").value;
                clearInterval(myInterval);
                myInterval = setInterval(rodar, fps);
          }
    </script>
</body>
</html>
)rawliteral";

AsyncWebServer server(80);
AsyncEventSource events("/events");

void setup() {
    
    Serial.begin(115200);
    WiFi.mode(WIFI_STA);
    WiFi.begin(SSID, PASSWORD);
    if (WiFi.waitForConnectResult() != WL_CONNECTED) {
        Serial.println("WiFi not connected");
        return;
    }

    Serial.println();
    Serial.print("IP Address: ");
    Serial.println(WiFi.localIP());
    camera_config_t config;
    config.ledc_channel = LEDC_CHANNEL_0;
    config.ledc_timer = LEDC_TIMER_0;
    config.pin_d0 = Y2_GPIO_NUM;
    config.pin_d1 = Y3_GPIO_NUM;
    config.pin_d2 = Y4_GPIO_NUM;
    config.pin_d3 = Y5_GPIO_NUM;
    config.pin_d4 = Y6_GPIO_NUM;
    config.pin_d5 = Y7_GPIO_NUM;
    config.pin_d6 = Y8_GPIO_NUM;
    config.pin_d7 = Y9_GPIO_NUM;
    config.pin_xclk = XCLK_GPIO_NUM;
    config.pin_pclk = PCLK_GPIO_NUM;
    config.pin_vsync = VSYNC_GPIO_NUM;
    config.pin_href = HREF_GPIO_NUM;
    config.pin_sscb_sda = SIOD_GPIO_NUM;
    config.pin_sscb_scl = SIOC_GPIO_NUM;
    config.pin_pwdn = PWDN_GPIO_NUM;
    config.pin_reset = RESET_GPIO_NUM;
    config.xclk_freq_hz = 20000000; // Aumentar a frequência do clock XCLK, se possível
    config.pixel_format = PIXFORMAT_JPEG;

    if (psramFound()) {
        config.frame_size = FRAMESIZE_QVGA; // Reduzir resolução para aumentar o FPS
        config.jpeg_quality = 10;
        config.fb_count = 2;
    } else {
        config.frame_size = FRAMESIZE_SVGA;
        config.jpeg_quality = 12;
        config.fb_count = 1;
    }

    esp_err_t err = esp_camera_init(&config);
    if (err != ESP_OK) {
        Serial.printf("Camera init failed with error 0x%x", err);
        return;
    }

    server.on("/", HTTP_GET, [](AsyncWebServerRequest *request) {
        request->send_P(200, "text/html", index_html);
    });

    server.on("/cam", HTTP_GET, [](AsyncWebServerRequest *request) {
        camera_fb_t *fb = esp_camera_fb_get();
        if (!fb) {
            Serial.println("Camera capture failed");
            return;
        }

        String camCod = base64::encode(fb->buf, fb->len);
        request->send_P(200, "text/plain", camCod.c_str());
        esp_camera_fb_return(fb);
    });

    events.onConnect([](AsyncEventSourceClient *client) {
        if (client->lastId()) {
            Serial.printf("Client reconnected! Last message ID that it got is: %u\n", client->lastId());
        }
        client->send("hello!", NULL, millis(), 10000);
    });

    server.addHandler(&events);
    server.begin();
}

// https://github.com/PeterNV/ESP32-CAM-WEB-SERVER-REQUEST/blob/main/Esp32CamWebServerRequest.ino


void loop() {
  
}
