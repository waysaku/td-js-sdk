var branch = process.env.TRAVIS_PULL_REQUEST_BRANCH || process.env.TRAVIS_BRANCH
var sha = require('child_process')
  .execSync('git rev-parse --short=9 HEAD', { cwd: __dirname })
  .toString().trim()
var startTime = new Date().toISOString()

var webpackConfig = require('./webpack.config')
webpackConfig.entry = undefined
webpackConfig.mode = 'development'

module.exports = function (config) {
  config.set({
    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // Allocating a browser can take pretty long (eg. if we are out of capacity and need to wait
    // for another build to finish) and so the `captureTimeout` typically kills
    // an in-queue-pending request, which makes no sense.
    captureTimeout: 120000,

    // Increase default browser timeout for when
    // devices or emulators take a while to boot up
    browserNoActivityTimeout: 120000,

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha'],

    // list of files / patterns to load in the browser
    files: [
      require.resolve('@babel/polyfill/dist/polyfill.js'),
      { pattern: 'lib/**/*.js', included: false },
      { pattern: 'test/*.spec.js', included: true, watched: false }
    ],

    // list of files to exclude
    exclude: [],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'test/*.spec.js': ['webpack']
    },

    webpack: webpackConfig,

    webpackMiddleware: {
      // webpack-dev-middleware configuration
      // i. e.
      stats: 'errors-only'
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['mocha', 'BrowserStack'],

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: false,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,

    browserStack: {
      project: branch === 'master' ? 'td-js-sdk' : 'td-js-sdk-dev',
      build: `${sha} ${startTime}`,
      startTunnel: false
    },

    // define browsers
    customLaunchers: {
      bs_firefox_latest_mac: {
        base: 'BrowserStack',
        browser: 'firefox',
        os: 'OS X',
        os_version: 'High Sierra'
      },
      bs_chrome_latest_mac: {
        base: 'BrowserStack',
        browser: 'chrome',
        os: 'OS X',
        os_version: 'High Sierra'
      },
      bs_safari_7_mac: {
        base: 'BrowserStack',
        browser: 'safari',
        browser_version: '7.1',
        os: 'OS X',
        os_version: 'Mavericks'
      },
      bs_safari_8_mac: {
        base: 'BrowserStack',
        browser: 'safari',
        browser_version: '8.0',
        os: 'OS X',
        os_version: 'Yosemite'
      },
      bs_safari_9_mac: {
        base: 'BrowserStack',
        browser: 'safari',
        browser_version: '9.1',
        os: 'OS X',
        os_version: 'El Capitan'
      },
      bs_safari_10_mac: {
        base: 'BrowserStack',
        browser: 'safari',
        browser_version: '10.0',
        os: 'OS X',
        os_version: 'Sierra'
      },
      bs_safari_11_mac: {
        base: 'BrowserStack',
        browser: 'safari',
        browser_version: '11.1',
        os: 'OS X',
        os_version: 'High Sierra'
      },
      bs_ie_11_win: {
        base: 'BrowserStack',
        browser: 'ie',
        browser_version: '11.0',
        os: 'Windows',
        os_version: '10'
      },
      bs_edge_latest_win: {
        base: 'BrowserStack',
        browser: 'edge',
        os: 'Windows',
        os_version: '10'
      },
      bs_iphone6: {
        base: 'BrowserStack',
        device: 'iPhone 6',
        os: 'ios',
        os_version: '11',
        real_mobile: true
      },
      bs_iphone6_9: {
        base: 'BrowserStack',
        device: 'iPhone 6S',
        os: 'ios',
        os_version: '12',
        real_mobile: true
      },
      bs_iphone7: {
        base: 'BrowserStack',
        os: 'ios',
        os_version: '12',
        browser: 'iphone',
        device: 'iPhone 7',
        real_mobile: true
      },
      bs_iphone8: {
        base: 'BrowserStack',
        device: 'iPhone 8',
        os: 'ios',
        os_version: '11'
      },
      android50: {
        base: 'BrowserStack',
        device: 'Samsung Galaxy S6',
        os: 'android',
        os_version: '5.0',
        real_mobile: 'true'
      },
      android60: {
        base: 'BrowserStack',
        device: 'Google Nexus 6',
        os: 'android',
        os_version: '6.0',
        real_mobile: 'true'
      },
      android71: {
        base: 'BrowserStack',
        device: 'Google Pixel',
        os: 'android',
        os_version: '7.1',
        real_mobile: 'true'
      },
      android80: {
        base: 'BrowserStack',
        device: 'Google Pixel',
        os: 'android',
        os_version: '8.0',
        browser: 'android',
        real_mobile: true
      }
    },

    browsers: [
      'bs_firefox_latest_mac',
      'bs_chrome_latest_mac',
      'bs_safari_8_mac',
      'bs_safari_9_mac',
      'bs_safari_10_mac',
      'bs_safari_11_mac',
      'bs_ie_11_win',
      'bs_edge_latest_win',
      'bs_iphone6',
      'bs_iphone6_9',
      'bs_iphone7',
      'bs_iphone8',
      'android50',
      'android60',
      'android71'
    ],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: 5
  })
}
