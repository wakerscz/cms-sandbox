/**
 * Copyright (c) 2019 Wakers.cz
 * @author Jiří Zapletal (http://www.wakers.cz, zapletal@wakers.cz)
 *
 * DŮLEŽITÉ:
 *
 *      Na začátku zdrojových souborů nepoužívat podtržítko, GULP tyto soubory ignoruje.
 *      V názech souborů nepoužávat tečky, GULP tyto soubory ignoruje.
 *
 *      Špatně:     './assets/static/frontend/scss/_test.test.ext'
 *      Správně:    './assets/static/frontend/scss/test_test.ext'
 *
 */

module.exports = function ()
{
    return {

        jsOnlyProduction:
        [
            // Soubory pouze pro produkční verzi př: GA, GTM, Smartlook, Hotjar, atd.
            './assets/static/js/measurement.js'
        ],

        js:
        [
            './assets/static/js/main.js'
        ],

        file:
        [
            { from: './assets/static/image/favicon.ico', to: '/image'}
        ]

    };
}();