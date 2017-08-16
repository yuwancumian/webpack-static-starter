const path    = require('path');
const webpack = require('webpack');
const glob    = require('glob');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");

let srcPath = path.resolve(__dirname + "/src");
let config = glob.sync(srcPath + "/*/*.js");
let genHtmlPlugins = [];
config.forEach(v=>{
    genHtmlPlugins.push(new HtmlWebpackPlugin({
        filename: v + '/index.html'
    }))
})

module.exports = {
    entry: [
        'webpack-dev-server/client?http://localhost:8080/',
        './src/script/index.js'
    ],
    output:{
        path: __dirname,
        filename: 'bundle.js',
        publicPath: '/',
        libraryTarget: 'umd'
    },
    module: {
        loaders: [{
            test: /\.less$/,
            loader: "style-loader!css-loader!less-loader"
        }]
        
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new ExtractTextPlugin('style.css'),

        new HtmlWebpackPlugin({  // Also generate a test.html
            filename: 'test.html',
        }),
        new BrowserSyncPlugin({
            // browse to http://localhost:3000/ during development,
            // ./public directory is being served
            host: 'localhost',
            port: 3000,
            proxy: "localhost:8080",
            notify: false,
            files: "src/*.html"
        })
    ]
}