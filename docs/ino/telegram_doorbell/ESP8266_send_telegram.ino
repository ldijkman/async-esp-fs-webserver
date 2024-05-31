/*******************************************************************
    A telegram bot that sends you a message when ESP
    starts up
    https://github.com/witnessmenow/Universal-Arduino-Telegram-Bot

    Parts:
    D1 Mini ESP8266 * - http://s.click.aliexpress.com/e/uzFUnIe
    (or any ESP8266 board)

      = Affilate

    If you find what I do useful and would like to support me,
    please consider becoming a sponsor on Github
    https://github.com/sponsors/witnessmenow/


    Written by Brian Lough
    YouTube: https://www.youtube.com/brianlough
    Tindie: https://www.tindie.com/stores/brianlough/
    Twitter: https://twitter.com/witnessmenow
 *******************************************************************/



// changes by Luberth
// https://ldijkman.github.io/async-esp-fs-webserver/
// https://github.com/ldijkman/async-esp-fs-webserver/edit/master/docs/ino/telegram_doorbell/ESP8266_send_telegram.ino

#include <ESP8266WiFi.h>
#include <WiFiClientSecure.h>
#include <UniversalTelegramBot.h>     // manage libraries, 
                                      // search for Universal Telegram Bot Library
                                      // https://github.com/witnessmenow/Universal-Arduino-Telegram-Bot
#include <ArduinoJson.h>

// Wifi network station credentials
#define WIFI_SSID "Bangert_30_Andijk"         // wifi router name broadcasted in the air
#define WIFI_PASSWORD "ookikwilerin"          // wifi router password


/*
    https://t.me/botfather
     Telegram BOT Token (Get from Botfather)
     Use magnify search find on main telegram
     search for @Botfather
    /newbot
*/
#define BOT_TOKEN "xxxxxxxxx:xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"

/*
    https://t.me/myidbot
     Use magnify search find on main telegram
     search for @idbot
    /getid
*/
#define CHAT_ID "623654364565"

X509List cert(TELEGRAM_CERTIFICATE_ROOT);
WiFiClientSecure secured_client;
UniversalTelegramBot bot(BOT_TOKEN, secured_client);

void setup() {
  Serial.begin(115200);
  Serial.println();

 // attempt to connect to Wifi network:
  Serial.print("Connecting to Wifi SSID ");
  Serial.print(WIFI_SSID);
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  secured_client.setTrustAnchors(&cert); // Add root certificate for api.telegram.org
  while (WiFi.status() != WL_CONNECTED)
  {
    Serial.print(".");
    delay(500);
  }
  Serial.print("\nWiFi connected. IP address: ");
  Serial.println(WiFi.localIP());

  Serial.print("Retrieving time: ");
  configTime(0, 0, "time.google.com"); // get UTC time via NTP
  time_t now = time(nullptr);
  while (now < 24 * 3600)
  {
    Serial.print(".");
    delay(1000);
    now = time(nullptr);
  }
  Serial.println(now);

  bot.sendMessage(CHAT_ID, "Bot started up", "");
}

void loop() {
delay(10000);
bot.sendMessage(CHAT_ID, "Bot time message http://test.local", "");
Serial.println("done");

}
