const path = require('path');
const ngAnnotatePlugin = require('ng-annotate-webpack-plugin');

module.exports = {
    entry: {
        vendor: './src/frontend/public/vendor.js',
        polyfills: './src/frontend/public/polyfills.js',
        app: './src/frontend/public/main.ts'
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist/frontend/public')
    },
    mode: 'production',
    plugins: [
        new ngAnnotatePlugin({
            add: true
        })
    ],
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.(html)$/,
                use: {
                    loader: 'html-loader'
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
                use: ['url-loader']
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    }
};
