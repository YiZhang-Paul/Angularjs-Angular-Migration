const merge = require('webpack-merge');
const ngAnnotatePlugin = require('ng-annotate-webpack-plugin');
const development = require('./development.config');

const config = {
    mode: 'production',
    plugins: [new ngAnnotatePlugin({ add: true })]
};

module.exports = merge(development, config);
