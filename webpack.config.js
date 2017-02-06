var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');

module.exports = {
    context: path.join(__dirname, "src"),
    devtool: debug ? "source-map" : false,
    entry: [
        "./js/client.js"
    ],
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015', 'stage-0'],
                    plugins: ['react-html-attrs', 'transform-decorators-legacy', 'transform-class-properties', 'transform-react-jsx-img-import']
                }
            }
        ]
    },
    output: {
        path: __dirname + "/dist",
        filename: "client.min.js",
        publicPath: debug ? "/" : "/dist",
    },
    plugins: debug ? [] : [
        new ExtractTextPlugin("style.min.css"),
        new webpack.optimize.UglifyJsPlugin({mangle: false, sourcemap: false})
    ]
};
