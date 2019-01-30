const path = require('path');
const entry = './src/frontend/public/specs.js';

module.exports = function (config) {
    config.set({
        basePath: '',
        files: [
            './node_modules/angular/angular.js',
            './node_modules/angular-mocks/angular-mocks.js',
            './node_modules/@uirouter/angularjs/release/angular-ui-router.js',
            entry
        ],
        preprocessors: {
            [entry]: ['webpack', 'sourcemap']
        },
        webpack: {
            devtool: 'inline-source-map',
            mode: 'development',
            module: {
                rules: [
                    {
                        test: /\.js$/,
                        use: {
                            loader: 'istanbul-instrumenter-loader',
                            options: { esModules: true }
                        },
                        include: path.resolve('./src/frontend/public/'),
                        exclude: /\.?specs?\.js$/
                    },
                    {
                        test: /\.m?js$/,
                        exclude: /(node_modules|bower_components)/,
                        use: {
                            loader: 'babel-loader'
                        }
                    }
                ],
            }
        },
        reporters: ['mocha', 'coverage-istanbul', 'remap-coverage'],
        autoWatch: false,
        singleRun: true,
        frameworks: ['mocha', 'chai', 'sinon'],
        browsers: ['Chrome'],
        coverageIstanbulReporter: {
            reports: ['text', 'text-summary'],
            fixWebpackSourcePaths: true
        },
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
        plugins: [
            'karma-chrome-launcher',
            'karma-mocha',
            'karma-mocha-reporter',
            'karma-chai',
            'karma-sinon',
            'karma-webpack',
            'karma-sourcemap-loader',
            'karma-coverage',
            'karma-remap-coverage',
            'karma-coverage-istanbul-reporter'
        ],
        webpackMiddleware: {
            noInfo: true,
            stats: {
                chunks: false
            }
        },
        coverageReporter: {
            type: 'in-memory'
        },
        remapCoverageReporter: {
            'text-summary': null,
            json: './coverage/coverage.json',
            html: './coverage/html'
        }
    });
};
