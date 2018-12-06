/**
 * Frontend web measurement included only in production environment.
 * Author: Jiří Zapletal
 * Company: Wakers (http://www.wakers.cz)
 * Contact: zapletal@wakers.cz
 * Copyright 2017
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
gtag('config', 'UA-53420713-2');