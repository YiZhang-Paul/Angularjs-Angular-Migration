module.exports = function (config) {
    config.set({
        basePath: '',
        files: [
            './node_modules/angular/angular.js',
            './node_modules/angular-mocks/angular-mocks.js',
            './src/frontend/public/app/specs.js'
        ],
        preprocessors: {
            './src/frontend/public/app/specs.js': ['webpack', 'sourcemap']
        },
        webpack: {
            devtool: 'inline-source-map',
            mode: 'development'
        },
        autoWatch: false,
        singleRun: true,
        frameworks: ['mocha', 'chai', 'sinon'],
        browsers: ['Chrome'],
        plugins: [
            'karma-chrome-launcher',
            'karma-mocha',
            'karma-chai',
            'karma-sinon',
            'karma-webpack',
            'karma-sourcemap-loader'
        ],
        webpackMiddleware: {
			noInfo: true,
			stats: {
				chunks: false
			}
		}
    });
};
