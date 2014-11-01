// Karma configuration
// Generated on Sun Feb 16 2014 23:02:46 GMT+0530 (India Standard Time)

module.exports = function (config) {
    config.set({

        // base path, that will be used to resolve files and exclude
        basePath: '',


        // frameworks to use
        frameworks: ['jasmine'],

        preprocessors: {            
            './controllers/*.js': 'coverage',
            './services/*.js' : 'coverage'
        },


        // list of files / patterns to load in the browser
        files: [
          '../Scripts/jquery-2.1.0.js',
          '../Scripts/angular.js',
          '../Scripts/angular-resource.js',
          '../Scripts/angular-mocks.js',
          '../Scripts/promise-tracker.js',
          '../Scripts/sinon-1.7.3.js',
          './app.js',
          './models/*.js',
          './services/*.js',
          './controllers/*.js',
          './test/*Spec.js'
        ],


        // list of files to exclude
        exclude: [
          './Scripts/*.min.js',
          './*.map'
        ],


        // test results reporter to use
        // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
        reporters: ['progress', 'coverage'],        


        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,


        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera (has to be installed with `npm install karma-opera-launcher`)
        // - Safari (only Mac; has to be installed with `npm install karma-safari-launcher`)
        // - PhantomJS
        // - IE (only Windows; has to be installed with `npm install karma-ie-launcher`)
        //browsers: ['Chrome','PhantomJS','IE','Firefox','Safari'],
        browsers: ['PhantomJS'],

        // If browser does not capture in given timeout [ms], kill it
        captureTimeout: 60000,


        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        singleRun: false
    });
};
