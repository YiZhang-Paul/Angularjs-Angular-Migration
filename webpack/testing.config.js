const path = require('path');
const merge = require('webpack-merge');
const base = require('./base.config');

const loaders = [
    {
        test: /\.(t|j)s$/,
        enforce: 'post',
        include: path.resolve('./src/frontend/public/'),
        exclude: [
            /\.?(main|app.module|stub|specs?)\.(t|j)s$/,
            /assets|node_modules/
        ],
        use: {
            loader: 'istanbul-instrumenter-loader',
            options: { esModules: true }
        }
    }
];

module.exports = {
    devtool: 'inline-source-map',
    mode: 'development',
    resolve: base.resolve,
    module: merge(base.module, { rules: loaders })
};
