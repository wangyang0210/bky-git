/*
* @Author: wyy
* @Date:   2019-02-14 10:45:50
* @Email:  2752154874@qq.com
* @Last Modified by:   wyy
* @Last Modified time: 2019-02-14 11:23:08
*/
const webpack = require('webpack'); //引入内置插件
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
    mode: 'production',
    devtool: 'null',//修改为null压缩打包代码
    entry: __dirname + "/app/main.js",
    output: {
        path: __dirname + "/build",
        filename: "bundle.js"
    },
    devServer: {
        contentBase: "./build",//本地服务器所加载的页面所在的目录
        historyApiFallback: true,//不跳转
        inline: true//实时刷新
    },
    module: {
        rules: [{
                    test: /(\.jsx|\.js)$/,
                    use: {
                        loader: "babel-loader",
                    },
                    exclude: /node_modules/
                }
        ]
    },
    plugins: [
        new webpack.BannerPlugin('版权所有，翻版必究'),
        new HtmlWebpackPlugin({
            template: __dirname + "/app/index.tmpl.html"//new 一个这个插件的实例，并传入相关的参数
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        // new webpack.optimize.UglifyJsPlugin(),
        new ExtractTextPlugin("style.css")
    ],
}