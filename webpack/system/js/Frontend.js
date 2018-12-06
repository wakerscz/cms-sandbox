/**
 * Copyright (c) 2018 Wakers.cz
 *
 * @author Jiří Zapletal (http://www.wakers.cz, zapletal@wakers.cz)
 *
 */


/*
    SCRIPTS - REQUIRED BY SYSTEM
    Prvně se načte frontend.js a pokud má uživatel práva k inpage-manager, tak se později načte i inPageManager.js
 */

// Node - jQuery
import '../../../node_modules/jquery/src/jquery';

// Lang - Translate
import '../../../vendor/wakers/cms-lang-module/src/assets/Common/translate/js/translate'

// App - Translations
import '../../../i18n/system'

// Base / Node - Nette AJAX
import 'script-loader!../../../node_modules/nette.ajax.js/nette.ajax';
import 'script-loader!../../../vendor/wakers/cms-base-module/src/assets/Common/ajax/js/ajax';

// Base / Node - Nette Forms & Live Validation
import 'script-loader!../../../vendor/wakers/cms-base-module/src/assets/Frontend/live-validation/js/liveValidation';
import 'script-loader!../../../node_modules/live-form-validation/live-form-validation';
import '../../../vendor/wakers/cms-base-module/src/assets/Common/validator/js/validator'

// Base / Node - Notifications
import 'script-loader!../../../node_modules/lobibox/js/notifications';
import '../../../vendor/wakers/cms-base-module/src/assets/Common/notification/js/notification';

// Base - Modals
import '../../../vendor/wakers/cms-base-module/src/assets/Common/modal/js/modal';

// Base - Dasboard
import '../../../vendor/wakers/cms-base-module/src/assets/Common/dashboard/js/dashboard';

// Base - Progress button
import '../../../vendor/wakers/cms-base-module/src/assets/Common/progress-button/js/progressButton';

// User - Login
import '../../../vendor/wakers/cms-user-module/src/assets/Frontend/login-modal/js/loginModal';

// Util - Amimate CSS
import '../../../vendor/wakers/cms-base-module/src/assets/Common/animate/js/animate';

// Base - Wakers Run
import '../../../vendor/wakers/cms-base-module/src/assets/Common/run/js/run';

/*
    IMAGES
 */

import 'file-loader?&name=image/[name].[ext]!../../../assets/static/image/favicon.ico';


/*
    STYLES (only main file)
 */

import '../scss/frontend.scss';


/*
 * Custom web
 */
import '../../Custom'





