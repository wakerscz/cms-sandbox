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

        js:
        [
            // Page - Add Form
            './vendor/wakers/cms-page-module/src/assets/Frontend/add-form/js/addForm.js',

            // OnPage - OG & SEO checker
            './vendor/wakers/cms-onpage-module/src/assets/Frontend/onpage/js/ogSeoChecker.js',

            // Category - Category modal
            './vendor/wakers/cms-category-module/src/assets/Frontend/modal/js/modal.js',

            // Structure - Structure modal
            './vendor/wakers/cms-structure-module/src/assets/Frontend/structure-modal/js/fileForm.js',

            // Util / Node - TinyMCE
            './node_modules/tinymce/tinymce.js',
            './node_modules/tinymce/themes/modern/theme.js',
            './node_modules/tinymce/plugins/textcolor/plugin.js',
            './node_modules/tinymce/plugins/lists/plugin.js',
            './node_modules/tinymce/plugins/code/plugin.js',
            './node_modules/tinymce/plugins/link/plugin.js',
            './node_modules/tinymce/plugins/table/plugin.js',
            './node_modules/tinymce/plugins/paste/plugin.js',
            './node_modules/tinymce/plugins/image/plugin.js',
            './node_modules/tinymce/plugins/nonbreaking/plugin.js',
            './vendor/wakers/cms-structure-module/src/assets/Frontend/tinymce/js/tinymce_cs.js',
            './vendor/wakers/cms-structure-module/src/assets/Frontend/tinymce/js/tinymce.js'
        ],

        file:
        [
            { from: 'node_modules/tinymce/skins/lightgray/fonts/*', to: '/font' }
        ],

        scss:
        [
            // Zde načítat pouze tento zaváděcí soubor!
            './assets/static/_asset-loader/scss/sys-inpage-manager.scss'
        ],

    };
}();