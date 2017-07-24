const path = require('path');
const webpack = require('webpack');

const ExtractTextPlugin = require("extract-text-webpack-plugin");
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const NyanProgressPlugin = require('nyan-progress-webpack-plugin');

module.exports = {
    entry: [
        './src/script/index.js'
    ],
    output:{
        path: path.join(__dirname, 'static'),
        filename: 'bundle.js',
        publicPath: 'static/',
        libraryTarget: 'umd'
    },
    module: {
        rules: [{
            test: /\.less$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                //resolve-url-loader may be chained before sass-loader if necessary
                use: ['css-loader', 'less-loader']
            })
        }]
    },
    plugins: [
        new ExtractTextPlugin('style.css'),
        new UglifyJSPlugin(),
        new NyanProgressPlugin()  
    ]
}