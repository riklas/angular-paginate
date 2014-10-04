// Karma conf

module.exports = function(config){
	config.set({

		// base path to resolve all patterns (e.g. files, exclude)
		basePath: '',

		// frameworks to use
		// available frameworks: http:s//npmjs.org/browse/keyword/karma-adapter
		frameworks: ['jasmine'],

		plugins: [
			'karma-jasmine',
			'karma-coverage',
			'karma-junit-reporter',
			'karma-phantomjs-launcher',
			'karma-chrome-launcher',
			'karma-firefox-launcher'
		],

		// list of files to load in browser
		files: [
			// vendor
			"lib/angular/angular.min.js",
			"lib/angular/angular-mocks.js",
			// source
			"js/angular-paginate.js",
			//spec
			"spec/spec-data.js",
			"spec/pagination-controller-spec.js",
			"spec/create-pages-directive-spec.js",
			"spec/pagination-directive-spec.js",
			"spec/pagination-left-directive-spec.js",
			"spec/pagination-right-directive-spec.js"
		],

		// list of files to exclude
		exclude: [
		],

		// preprocess matching files before serving them to the browser
		preprocessors: {
			"js/angular-paginate.js" : ["coverage"],
		},

		// tests results reporter to use
		// possible values: 'dots', 'progress'
		reporters: ['progress', 'coverage'],

		// web server port
		port: 9879,

		// enable/disable colors in output
		colors: true,

		// log level
		logLevel: config.LOG_INFO,

		// enable/disable watching file and executing tests whenever the file changes
		autoWatch: false,

		// browsers to start
		browsers: ['PhantomJS'],

		// Continuous integration mode. If true karma captures browsers, runs tests and exits
		singleRun: true,
	});
};