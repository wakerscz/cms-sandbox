/**
 * Copyright (c) 2018 Wakers.cz
 *
 * @author Jiří Zapletal (http://www.wakers.cz, zapletal@wakers.cz)
 *
 */

/*
    SCRIPTS
 */

// Page - Add Form
import '../../../vendor/wakers/cms-page-module/src/assets/Frontend/add-form/js/addForm'

// OnPage - OG & SEO checker
import '../../../vendor/wakers/cms-onpage-module/src/assets/Frontend/onpage/js/ogSeoChecker'

// Category - Category modal
import '../../../vendor/wakers/cms-category-module/src/assets/Frontend/modal/js/modal'

// Structure - Structure modal
import '../../../vendor/wakers/cms-structure-module/src/assets/Frontend/structure-modal/js/fileForm'

// Util / Node - TinyMCE
import '../../../node_modules/tinymce/tinymce'
import '../../../node_modules/tinymce/themes/modern/theme'
import '../../../node_modules/tinymce/plugins/textcolor/plugin'
import '../../../node_modules/tinymce/plugins/lists/plugin'
import '../../../node_modules/tinymce/plugins/code/plugin'
import '../../../node_modules/tinymce/plugins/link/plugin'
import '../../../node_modules/tinymce/plugins/table/plugin'
import '../../../node_modules/tinymce/plugins/paste/plugin'
import '../../../node_modules/tinymce/plugins/image/plugin'
import '../../../node_modules/tinymce/plugins/nonbreaking/plugin'
import '../../../vendor/wakers/cms-structure-module/src/assets/Frontend/tinymce/js/tinymce_cs'
import '../../../vendor/wakers/cms-structure-module/src/assets/Frontend/tinymce/js/tinymce'

/*
    STYLES
 */

import '../scss/in-page-manager.scss'


/*
    SOUNDS
 */

// Notifications (REQUIRED BY SYSTEM)
import 'file-loader?&name=sound/notification/[name].[ext]!../../../node_modules/lobibox/sounds/sound4.ogg';


/*
    FONTS
 */

// Node - TinyMCE
import 'file-loader?&name=font/[name].[ext]!../../../node_modules/tinymce/skins/lightgray/fonts/tinymce.eot'
import 'file-loader?&name=font/[name].[ext]!../../../node_modules/tinymce/skins/lightgray/fonts/tinymce.svg'
import 'file-loader?&name=font/[name].[ext]!../../../node_modules/tinymce/skins/lightgray/fonts/tinymce.ttf'
import 'file-loader?&name=font/[name].[ext]!../../../node_modules/tinymce/skins/lightgray/fonts/tinymce.woff'
import 'file-loader?&name=font/[name].[ext]!../../../node_modules/tinymce/skins/lightgray/fonts/tinymce-mobile.woff'
import 'file-loader?&name=font/[name].[ext]!../../../node_modules/tinymce/skins/lightgray/fonts/tinymce-small.eot'
import 'file-loader?&name=font/[name].[ext]!../../../node_modules/tinymce/skins/lightgray/fonts/tinymce-small.svg'
import 'file-loader?&name=font/[name].[ext]!../../../node_modules/tinymce/skins/lightgray/fonts/tinymce-small.ttf'
import 'file-loader?&name=font/[name].[ext]!../../../node_modules/tinymce/skins/lightgray/fonts/tinymce-small.woff'
