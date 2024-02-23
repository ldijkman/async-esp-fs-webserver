document.addEventListener('DOMContentLoaded', function() {
    const floatingDiv = document.createElement('div');
    // Increased padding and added font-size
    floatingDiv.style.cssText = 'position: fixed; bottom: 0; left: 0; width: 100%; background-color: #333; color: white; text-align: center; padding: 20px 0; font-size: 18px;';

    const links = [
        {href: 'https://github.com/ldijkman/async-esp-fs-webserver/tree/master/docs', color: 'blue', text: 'Github DOCS Source'},
        {href: 'https://github.com/ldijkman/async-esp-fs-webserver/issues', color: 'yellowgreen', text: 'Issues'},
        {href: 'https://github.com/ldijkman/async-esp-fs-webserver/discussions', color: 'yellowgreen', text: 'Discussions'},
        {href: 'https://ldijkman.github.io/async-esp-fs-webserver/WebSerialMonitor.html', color: 'lightblue', text: 'Serial Monitor'},
        {href: 'https://ldijkman.github.io/async-esp-fs-webserver/', color: 'limegreen', text: 'Flash 4mb ESP inBrowser'}
    ];

    links.forEach(link => {
        const a = document.createElement('a');
        a.href = link.href;
        a.target = '_blank';
        // Adjusted margin for consistency with increased font-size
        a.style.cssText = `color: ${link.color}; text-decoration: none; margin: 0 20px; font-size: inherit;`;
        a.textContent = link.text;
        floatingDiv.appendChild(a);
    });

    document.body.appendChild(floatingDiv);
});
