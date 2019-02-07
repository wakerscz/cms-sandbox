/**
 * Copyright (c) 2019 Wakers.cz
 * @author Jiří Zapletal (http://www.wakers.cz, zapletal@wakers.cz)
 */


// Google tag manager
(function (d) {
    var e = d.createElement('script');
    var h = d.getElementsByTagName('head')[0];
    e.async = true; e.src = 'https://www.googletagmanager.com/gtag/js'; e.type = 'text/javascript';
    h.appendChild(e, h);
})(document);

window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}

gtag('js', new Date());
gtag('config', 'XX-XXXXXXXX-X');