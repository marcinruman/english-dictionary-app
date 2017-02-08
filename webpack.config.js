var debug = process.env.NODE_ENV !== "production";
var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var path = require("path");

const sassLoader = debug ?

    ["style-loader", "css-loader", "postcss-loader", "sass-loader"]

    : 	ExtractTextPlugin.extract({
            loader: ["css-loader?minimize", "postcss-loader", "sass-loader"]
        });

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
            },
            {
                test: /\.(png|jpg|gif)$/,
                loaders: ['file-loader?limit=5000&name=images/[name]-[hash:6].[ext]'],
                exclude: /(node_modules|bower_components)/
            },
            {
                test: /\.(scss)$/,
                loader: sassLoader
            }
        ]
    },
    output: {
        path: __dirname + "/dist",
        filename: "client.min.js",
        publicPath: "/",
    },
    plugins: debug ? [] : [
        new ExtractTextPlugin("style.min.css"),
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production")
            }
        }),
        new webpack.optimize.UglifyJsPlugin({mangle: false, sourcemap: false})
    ]
};
