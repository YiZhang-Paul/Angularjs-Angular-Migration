const path = require('path');
const templates = './src/frontend/public/**/*.html';
const entry = './src/frontend/public/specs.js';

module.exports = function (config) {
    config.set({
        basePath: '',
        files: [
            './node_modules/angular/angular.js',
            './node_modules/angular-mocks/angular-mocks.js',
            './node_modules/angular-aria/angular-aria.js',
            './node_modules/angular-animate/angular-animate.js',
            './node_modules/angular-material/angular-material.js',
            './node_modules/@uirouter/angularjs/release/angular-ui-router.js',
            './node_modules/angular-toastr/dist/angular-toastr.js',
            templates,
            entry
        ],
        preprocessors: {
            [entry]: ['webpack', 'sourcemap'],
            [templates]: ['ng-html2js']
        },
        ngHtml2JsPreprocessor: {
            stripPrefix: 'src/frontend/public/',
            moduleName: 'component-templates'
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
                        exclude: [/\.?specs?\.js$/, /\.stub\.js$/]
                    },
                    {
                        test: /\.m?js$/,
                        exclude: /(node_modules|bower_components)/,
                        use: {
                            loader: 'babel-loader'
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
            'karma-coverage-istanbul-reporter',
            'karma-ng-html2js-preprocessor'
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
