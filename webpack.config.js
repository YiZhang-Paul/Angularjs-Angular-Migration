const path = require('path');
const ngAnnotatePlugin = require('ng-annotate-webpack-plugin');

module.exports = {
    entry: './src/frontend/public/app/app.module.js',
    output: {
        filename: 'bundle.js',
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
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    }
};
