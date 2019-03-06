const path = require('path');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const base = require('./base.config');

const config = {
    mode: 'development',
    devServer: {
        contentBase: path.join(__dirname, '../dist/frontend/public'),
        watchContentBase: true,
        historyApiFallback: true,
        port: 3050
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, '../src/frontend/public/index.html'),
            output: path.join(__dirname, '../dist/frontend/public/'),
            inject: 'head'
        })
    ]
};

module.exports = merge(base, config);
