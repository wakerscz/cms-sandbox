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
            // Soubory pouze pro produkční verzi př: Smartoolok pro ověřování použitelnosti
            //'./assets/static/js/site-manager-measurement.js'
        ],

        js:
        [
            // Node - jQuery
            './node_modules/jquery/dist/jquery.js',

            // Lang - Translate
            './vendor/wakers/cms-lang-module/src/assets/Common/translate/js/translate.js',

            // App - Translations
            './i18n/system.js',

            // Node - Popper for Bootstrap 4
            './node_modules/popper.js/dist/umd/popper.min.js',

            // Base / Node - Bootstrap 4
            './node_modules/bootstrap/dist/js/bootstrap.min.js',
            './vendor/wakers/cms-base-module/src/assets/SiteManager/bootstrap/js/bootstrap.js',

            // Base / Node Nette AJAX
            './node_modules/nette.ajax.js/nette.ajax.js',
            './vendor/wakers/cms-base-module/src/assets/Common/ajax/js/ajax.js',

            // Base / Node - Nette Forms & Live Validation
            './vendor/wakers/cms-base-module/src/assets/SiteManager/nette/js/liveValidation.js',
            './node_modules/live-form-validation/live-form-validation.js',

            // Base / Node - Notifications
            './node_modules/lobibox/js/notifications.js',
            './vendor/wakers/cms-base-module/src/assets/Common/notification/js/notification.js',

            // Base - Progress button
            './vendor/wakers/cms-base-module/src/assets/Common/progress-button/js/progressButton.js',

            // Base - Wakers Run
            './vendor/wakers/cms-base-module/src/assets/Common/run/js/run.js',
        ],

        file:
        [
            { from: './node_modules/lobibox/sounds/sound4.ogg', to: '/sound/notification' },
            { from: './node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.*', to: '/font' }
        ],

        scss:
        [
            // Zde načítat pouze tento zaváděcí soubor!
            './assets/static/_asset-loader/scss/sys-site-manager.scss'
        ]

    };
}();