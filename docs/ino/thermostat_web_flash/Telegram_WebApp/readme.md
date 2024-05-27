https://ldijkman.github.io/async-esp-fs-webserver/ino/thermostat_web_flash/Telegram_WebApp/Telegram_WebApp.html

https://ldijkman.github.io/async-esp-fs-webserver/ino/thermostat_web_flash/Telegram_WebApp/schedule.html

could i add a telegram webapp 
   for easier html javascripts time input

Yes, you can enhance the interaction with your ESP8266-based IoT device 

by integrating a Telegram Web App. 

Telegram Web Apps are web pages that are configured to be displayed inside Telegram chats, 

allowing for more advanced and user-friendly interfaces, 

such as custom forms for inputting time or scheduling tasks.


https://github.com/revenkroz/telegram-web-app-bot-example/discussions/25


https://github.com/revenkroz/telegram-web-app-bot-example


--

    telegram web app closing after Telegram.WebApp.sendData
        is this normal?
    html5 time input does behave different in telegram 
        https://ldijkman.github.io/async-esp-fs-webserver/ino/thermostat_web_flash/Telegram_WebApp/Telegram_WebApp.html
    How to inspect Telegram web app?
        Telegram Desktop on Windows and Linux​ 
            Go to Settings > Advanced > Experimental settings > Enable webview inspection. 
            Right click in the WebView and choose Inspect.

   
    create a bot 
        https://t.me/BotFather  and ask for /newbot            and get a bot token
   
    get id     
        https://t.me/myidbot and ask for /getid               and get chat_id
   
    new webapp url setting
       https://t.me/BotFather
            /newapp
            /editapp
            /myapps

   arduno ESP8266 telegram webapp only sends data when launched/opened from bottom keyboard  
        Mini Apps launched from a web_app type keyboard button
        can send data back to the bot in a service message using Telegram.WebApp.sendData.
        This makes it possible for the bot to produce a response without communicating with any external servers.   
        
  times are saved to browser local storage
        if you use the same device / browser it should save the times
