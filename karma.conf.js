const path = require('path');
const templates = './src/frontend/public/**/*.html';
const entry = './src/frontend/public/specs.ts';

module.exports = function (config) {
    config.set({
        basePath: '',
        customContextFile: './src/frontend/public/testing/karma-test-pages/context.html',
        customDebugFile: './src/frontend/public/testing/karma-test-pages/debug.html',
        files: [
            './node_modules/angular/angular.js',
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
            resolve: {
                extensions: ['.tsx', '.js', '.ts']
            },
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
                            loader: 'babel-loader',
                            options: {
                                presets: ['@babel/preset-env']
                            }
                        }
                    },
                    {
                        test: /\.(t|j)s$/,
                        enforce: 'post',
                        use: {
                            loader: 'istanbul-instrumenter-loader',
                            options: { esModules: true }
                        },
                        include: path.resolve('./src/frontend/public/'),
                        exclude: [/\.?(stub|specs?)\.(t|j)s$/, /assets|node_modules/]
                    },
                    {
                        test: /\.(html)$/,
                        use: {
                            loader: 'html-loader'
                        }
                    },
                    {
                        test: /\.scss$/,
                        use: ['style-loader', 'css-loader', 'sass-loader']
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
        autoWatch: true,
        singleRun: false,
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
