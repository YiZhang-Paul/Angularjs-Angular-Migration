const webpack = require('./webpack/testing.config');
const templates = './src/frontend/public/**/*.html';
const entry = './src/frontend/public/specs.ts';

module.exports = function (config) {
    config.set({
        basePath: '',
        customContextFile: './src/frontend/public/app/testing/karma-test-pages/context.html',
        customDebugFile: './src/frontend/public/app/testing/karma-test-pages/debug.html',
        files: ['./node_modules/angular/angular.js', templates, entry],
        preprocessors: {
            [entry]: ['webpack', 'sourcemap'],
            [templates]: ['ng-html2js']
        },
        ngHtml2JsPreprocessor: {
            stripPrefix: 'src/frontend/public/',
            moduleName: 'component-templates'
        },
        webpack,
        webpackMiddleware: {
            noInfo: true,
            stats: { chunks: false }
        },
        autoWatch: true,
        browsers: ['Chrome'],
        frameworks: ['mocha', 'chai', 'sinon'],
        reporters: ['mocha', 'coverage-istanbul', 'remap-coverage'],
        coverageReporter: { type: 'in-memory' },
        mochaReporter: {
            colors: {
                success: 'green',
                info: 'blue',
                warning: 'cyan',
                error: 'red'
            },
            symbols: {
                success: '+',
                info: '#',
                warning: '!',
                error: 'x'
            }
        },
        coverageIstanbulReporter: {
            reports: ['text', 'text-summary'],
            fixWebpackSourcePaths: true
        },
        remapCoverageReporter: {
            'text-summary': null,
            json: './coverage/coverage.json',
            html: './coverage/html'
        },
        plugins: [
            'karma-webpack',
            'karma-chrome-launcher',
            'karma-mocha',
            'karma-mocha-reporter',
            'karma-chai',
            'karma-sinon',
            'karma-coverage',
            'karma-coverage-istanbul-reporter',
            'karma-ng-html2js-preprocessor',
            'karma-sourcemap-loader',
            'karma-remap-coverage'
        ]
    });
};
