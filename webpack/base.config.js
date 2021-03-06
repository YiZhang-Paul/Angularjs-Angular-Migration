const path = require('path');

module.exports = {
    mode: 'none',
    entry: {
        polyfills: path.join(__dirname, '../src/frontend/public/app/assets/libraries/polyfills.ts'),
        app: path.join(__dirname, '../src/frontend/public/main.ts')
    },
    output: {
        filename: '[name].bundle.js',
        path: path.join(__dirname, '../dist/frontend/public')
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: ['ts-loader', 'angular2-template-loader']
            },
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: 'babel-loader'
            },
            {
                test: /\.html$/,
                use: 'html-loader'
            },
            {
                test: /\.scss$/,
                use: ['to-string-loader', 'style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
                use: 'url-loader'
            }
        ]
    }
};
