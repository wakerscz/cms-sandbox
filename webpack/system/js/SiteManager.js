/**
 * Copyright (c) 2018 Wakers.cz
 *
 * @author Jiří Zapletal (http://www.wakers.cz, zapletal@wakers.cz)
 *
 */

/*
    SCRIPTS
 */

// Node - jQuery
import '../../../node_modules/jquery/src/jquery';

// Lang - Translate
import '../../../vendor/wakerscz/cms-lang-module/src/assets/Common/translate/js/translate'

// App - Translations
import '../../../i18n/system'

// Node - Popper for Bootstrap 4
import 'script-loader!../../../node_modules/popper.js/dist/umd/popper.min';

// Base / Node - Bootstrap 4
import 'script-loader!../../../node_modules/bootstrap/dist/js/bootstrap.min';
import '../../../vendor/wakerscz/cms-base-module/src/assets/SiteManager/bootstrap/js/bootstrap';

// Base / Node Nette AJAX
import 'script-loader!../../../node_modules/nette.ajax.js/nette.ajax';
import '../../../vendor/wakerscz/cms-base-module/src/assets/Common/ajax/js/ajax';

// Base / Node - Nette Forms & Live Validation
import 'script-loader!../../../vendor/wakerscz/cms-base-module/src/assets/SiteManager/nette/js/liveValidation';
import 'script-loader!../../../node_modules/live-form-validation/live-form-validation';

// Base / Node - Notifications
import 'script-loader!../../../node_modules/lobibox/js/notifications';
import 'script-loader!../../../vendor/wakerscz/cms-base-module/src/assets/Common/notification/js/notification';

// Base - Progress button
import '../../../vendor/wakerscz/cms-base-module/src/assets/Common/progress-button/js/progressButton';

// Base - Wakers Run
import '../../../vendor/wakerscz/cms-base-module/src/assets/Common/run/js/run';


/*
    SOUNDS
 */

// Notifications
import 'file-loader?&name=sound/notification/[name].[ext]!../../../node_modules/lobibox/sounds/sound4.ogg';


/*
    FONTS
 */

// Font Awesome 4.7.0
import 'file-loader?&name=font/[name].[ext]!../../../node_modules/font-awesome/fonts/FontAwesome.otf';
import 'file-loader?&name=font/[name].[ext]!../../../node_modules/font-awesome/fonts/fontawesome-webfont.eot';
import 'file-loader?&name=font/[name].[ext]!../../../node_modules/font-awesome/fonts/fontawesome-webfont.svg';
import 'file-loader?&name=font/[name].[ext]!../../../node_modules/font-awesome/fonts/fontawesome-webfont.ttf';
import 'file-loader?&name=font/[name].[ext]!../../../node_modules/font-awesome/fonts/fontawesome-webfont.woff';
import 'file-loader?&name=font/[name].[ext]!../../../node_modules/font-awesome/fonts/fontawesome-webfont.woff2';


/*
    STYLES
 */

import '../scss/site-manager.scss';