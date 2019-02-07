/**
 * Copyright (c) 2019 Wakers.cz
 * @author Jiří Zapletal (http://www.wakers.cz, zapletal@wakers.cz)
 */

// Balíčky
const
    gulp            = require('gulp'),
    cleanCSS        = require('gulp-clean-css'),
    env             = require('gulp-environment'),
    filesExist      = require('files-exist'),
    concat          = require('gulp-concat'),
    hash            = require('gulp-hash'),
    sass            = require('gulp-sass'),
    uglify          = require('gulp-uglify'),
    packageImporter = require('node-sass-package-importer');

// Asset loadery
const loaders = {
    customFrontend: './assets/static/_asset-loader/gulp/custom-frontend',
    sysFrontend: './assets/static/_asset-loader/gulp/sys-frontend',
    sysInPageManager: './assets/static/_asset-loader/gulp/sys-inpage-manager',
    sysSiteManager: './assets/static/_asset-loader/gulp/sys-site-manager',
};

// Názvy výsledných souborů (js / scss)
const output = {
    frontend: 'sys-frontend-build',
    inPageManager: 'sys-inpage-manager-build',
    siteManager: 'sys-site-manager-build',

    manifest: '../manifest.json'
};

// Úložiště výsledných souborů
const storage = {
    JS: './www/temp/static/js',
    CSS: './www/temp/static/css',
    File: './www/temp/static'
};

// Načtené assets
var assets = {
    customFrontend: null,
    sysFrontend: null,
    sysInPageManager: null,
    sysSiteManager:null,
};

// Načte assets
gulp.task('load:assets', function (promise) {

    delete require.cache[require.resolve(loaders.customFrontend)];
    delete require.cache[require.resolve(loaders.sysFrontend)];
    delete require.cache[require.resolve(loaders.sysInPageManager)];
    delete require.cache[require.resolve(loaders.sysSiteManager)];

    assets.customFrontend = require(loaders.customFrontend);
    assets.sysFrontend = require(loaders.sysFrontend);
    assets.sysInPageManager = require(loaders.sysInPageManager);
    assets.sysSiteManager = require(loaders.sysSiteManager);

    promise();
});

// Kompilace JS frontendu (custom & system)
gulp.task('compile:frontend:js', function (promise) {

    // Přidá JS z custom frontendu
    assets.sysFrontend.js = assets.sysFrontend.js.concat(assets.customFrontend.js);

    // Případně přidá production only JS
    assets.sysFrontend.js = (env.is.production() ? assets.sysFrontend.js.concat(assets.customFrontend.jsOnlyProduction) : assets.sysFrontend.js);

    if (assets.sysFrontend.js.length === 0) {
        return promise();
    }

    // Minifikuje, sloučí a uloží název souboru do manifestu
    return gulp.src(filesExist(assets.sysFrontend.js))

        .pipe(concat(output.frontend + '.js'))
        .pipe(env.if.production(uglify()))

        .pipe(hash())
        .pipe(gulp.dest(storage.JS))
        .pipe(hash.manifest(output.manifest))
        .pipe(gulp.dest(storage.JS));

});

// Kompilace JS inpage-manageru
gulp.task('compile:inpage-manager:js', function (promise) {

    if (assets.sysInPageManager.js.length === 0) {
        return promise();
    }

    // Minifikuje, sloučí a uloží název souboru do manifestu
    return gulp.src(filesExist(assets.sysInPageManager.js))

        .pipe(concat(output.inPageManager + '.js'))
        .pipe(env.if.production(uglify()))

        .pipe(hash())
        .pipe(gulp.dest(storage.JS))
        .pipe(hash.manifest(output.manifest))
        .pipe(gulp.dest(storage.JS));

});

// Kompilace JS site-manageru
gulp.task('compile:site-manager:js', function (promise) {

    // Případně přidá production only JS
    assets.sysSiteManager.js = (env.is.production() ? assets.sysSiteManager.js.concat(assets.sysSiteManager.jsOnlyProduction) : assets.sysSiteManager.js);

    if (assets.sysSiteManager.js.length === 0) {
        return promise();
    }

    // Minifikuje, sloučí a uloží název souboru do manifestu
    return gulp.src(filesExist(assets.sysSiteManager.js))

        .pipe(concat(output.siteManager  + '.js'))
        .pipe(env.if.production(uglify()))

        .pipe(hash())
        .pipe(gulp.dest(storage.JS))
        .pipe(hash.manifest(output.manifest))
        .pipe(gulp.dest(storage.JS));

});

// Kompilace SCSS frontendu (custom & system)
gulp.task('compile:frontend:styles', function (promise) {

    if (assets.sysFrontend.scss.length === 0) {
        return promise();
    }

    return gulp.src(filesExist(assets.sysFrontend.scss))

        .pipe(env.if
            // compressed / compact
            .production(sass.sync( { importer: packageImporter(), outputStyle: 'compressed' }).on('error', sass.logError))
            .else(sass.sync( { importer: packageImporter(),  outputStyle: 'expanded' }).on('error', sass.logError)))

        .pipe(concat(output.frontend  + '.css'))
        .pipe(env.if.production(cleanCSS()))

        .pipe(hash())
        .pipe(gulp.dest(storage.CSS))
        .pipe(hash.manifest(output.manifest))

        .pipe(gulp.dest(storage.CSS));
});

// Kompilace SCSS inpage-manageru
gulp.task('compile:inpage-manager:styles', function (promise) {

    if (assets.sysInPageManager.scss.length === 0) {
        return promise();
    }

    return gulp.src(filesExist(assets.sysInPageManager.scss))

        .pipe(env.if
            .production(sass.sync( { importer: packageImporter(), outputStyle: 'compressed' }).on('error', sass.logError))
            .else(sass.sync( { importer: packageImporter(),  outputStyle: 'expanded' }).on('error', sass.logError)))

        .pipe(concat(output.inPageManager  + '.css'))
        .pipe(env.if.production(cleanCSS()))

        .pipe(hash())
        .pipe(gulp.dest(storage.CSS))
        .pipe(hash.manifest(output.manifest))

        .pipe(gulp.dest(storage.CSS));
});

// Kompilace SCSS site-manageru
gulp.task('compile:site-manager:styles', function (promise) {

    if (assets.sysSiteManager.scss.length === 0) {
        return promise();
    }

    return gulp.src(filesExist(assets.sysSiteManager.scss))

        .pipe(env.if
            .production(sass.sync( { importer: packageImporter(), outputStyle: 'compressed' }).on('error', sass.logError))
            .else(sass.sync( { importer: packageImporter(),  outputStyle: 'expanded' }).on('error', sass.logError)))

        .pipe(concat(output.siteManager  + '.css'))
        .pipe(env.if.production(cleanCSS()))

        .pipe(hash())
        .pipe(gulp.dest(storage.CSS))
        .pipe(hash.manifest(output.manifest))

        .pipe(gulp.dest(storage.CSS));
});

gulp.task('copy:files', function (promise) {

    var files = assets.customFrontend.file
        .concat(assets.sysFrontend.file)
        .concat(assets.sysInPageManager.file)
        .concat(assets.sysSiteManager.file);

    files.forEach(function (file)
    {
        [].push(gulp.src(filesExist(file.from))
            .pipe(gulp.dest(storage.File + file.to)))
    });

    return promise();
});

// Paralélně zpracuje tasky
gulp.task('default:parallel', gulp.parallel(

    'compile:frontend:styles',
    'compile:inpage-manager:styles',
    'compile:site-manager:styles',

    'compile:frontend:js',
    'compile:inpage-manager:js',
    'compile:site-manager:js',

    'copy:files'

));

// Watcher
gulp.task('watch', function () {

    gulp.watch(
        'assets/static/**/*',
        gulp.series('default')
    );

});

// Výchozí task
gulp.task('default', gulp.series(
    'load:assets',
    'default:parallel'
));