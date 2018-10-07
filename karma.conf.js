// Karma configuration

module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine', 'karma-typescript'],
        plugins: [
            'karma-jasmine',
            'karma-chrome-launcher',
            'karma-typescript'
        ],
        files: [
            { pattern: 'src/**/*.ts' }
        ],
        preprocessors: {
            '**/*.ts': 'karma-typescript'
        },
        exclude: [],
        reporters: ['progress', 'karma-typescript'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['ChromeHeadless'],
        singleRun: false,
        concurrency: Infinity,
        karmaTypescriptConfig: {
            coverageOptions: {
                exclude: [/\.(d|test)\.ts$/i, /.*node_modules.*/]
            },
            tsconfig: './tsconfig.test.json'
        }
    })
};
