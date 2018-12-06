/**
 * Copyright (c) 2018 Wakers.cz
 *
 * @author Jiří Zapletal (http://www.wakers.cz, zapletal@wakers.cz)
 *
 */

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const path = require('path');

module.exports = (env, argv) =>
({

    watchOptions:
    {
        ignored: ['vendor', 'node_modules', 'temp', 'www', 'log', 'docker', 'app']
    },

    entry:
    {
        inPageManager: './webpack/system/js/InPageManager.js',
        siteManager: './webpack/system/js/SiteManager.js',
        frontend: './webpack/system/js/Frontend.js',
    },

    output:
    {
        filename: './js/[name]-[hash].js',
        path: path.resolve(__dirname, 'www/temp/static')
    },

    optimization:
    {
        minimize: argv.mode === 'production',
        minimizer: argv.mode === 'production' ?
        [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: false // set to true if you want JS source maps
            }),
            new OptimizeCSSAssetsPlugin({})
        ]
        :
        []
    },

    plugins: argv.mode === 'production' ?
    [
        new ManifestPlugin(),
        new CleanWebpackPlugin(['www/temp/static']),
        new MiniCssExtractPlugin(
        {
            filename: "./css/[name]-[hash].css",
        })
    ]
    :
    [
        new ManifestPlugin(),
        new MiniCssExtractPlugin(
        {
            filename: "./css/[name]-[hash].css",
        })
    ],

    module:
    {
        rules:
        [
            {
                test: /\.s?css$/,
                use:
                [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader"
                ]
            },
        ]
    }
});