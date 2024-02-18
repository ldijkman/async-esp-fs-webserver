document.addEventListener('DOMContentLoaded', function() {
    const floatingDiv = document.createElement('div');
    floatingDiv.style.cssText = 'position: fixed; bottom: 0; left: 0; width: 100%; background-color: #333; color: white; text-align: center; padding: 10px 0;';

    const links = [
        {href: 'https://github.com/ldijkman/async-esp-fs-webserver/issues', color: 'yellowgreen', text: 'GitHub Issues'},
        {href: 'https://github.com/ldijkman/async-esp-fs-webserver/discussions', color: 'yellowgreen', text: 'GitHub Discussions'},
        {href: 'https://ldijkman.github.io/async-esp-fs-webserver/WebSerialMonitor.html', color: 'lightblue', text: 'Serial Monitor'},
        {href: 'https://ldijkman.github.io/async-esp-fs-webserver/', color: 'red', text: 'Flash 4mb ESP8266 / ESP32 in browser'}
    ];

    links.forEach(link => {
        const a = document.createElement('a');
        a.href = link.href;
        a.target = '_blank';
        a.style.cssText = `color: ${link.color}; text-decoration: none; margin-right: 20px;`;
        a.textContent = link.text;
        floatingDiv.appendChild(a);
    });

    document.body.appendChild(floatingDiv);
});
