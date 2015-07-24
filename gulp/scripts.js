'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var browserSync = require('browser-sync');

var $ = require('gulp-load-plugins')();

  var tsProject = $.typescript.createProject({
    target: 'ES5',
    sortOutput: true,
      emitDecoratorMetadata: true,
      experimentalDecorators: true,
    //module: 'UMD',
    module: 'commonjs',
    typescript: require('typescript') // require('../../TypeScript/built/local/typescript')
  });


gulp.task('tsd-scripts', ['tsd:install'], function () {



  return gulp.src([path.join(conf.paths.src, '/app/**/*.ts'), path.join(conf.paths.useClientConfig, '/**/*.ts')])
    //.pipe($.sourcemaps.init())
    .pipe($.tslint())
    .pipe($.tslint.report('prose', { emitError: false }))
    .pipe($.typescript(tsProject)).on('error', conf.errorHandler('TypeScript'))




    //.pipe($.concat('app.module.js'))
    //.pipe($.sourcemaps.write())
    .pipe(gulp.dest(path.join(conf.paths.tmpts, '/serve/app')))
    //.pipe(browserSync.reload({ stream: true }))
    //.pipe($.size())
});

gulp.task('scripts', ['tsd-scripts'], function () {
    var watch = false;
    var webpackOptions = {
        watch: watch,
        module: {
            // preLoaders: [{ test: /\.js$/, exclude: /node_modules/, loader: 'jshint-loader'}],
            loaders: [{ test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'}]
        },
        output: { filename: 'index.module.js' }
    };

    if(watch) {
        webpackOptions.devtool = 'inline-source-map';
    }

    var webpackChangeHandler = function(err, stats) {
        if(err) {
            conf.errorHandler('Webpack')(err);
        }
        $.util.log(stats.toString({
            colors: $.util.colors.supportsColor,
            chunks: false,
            hash: false,
            version: false
        }));
        browserSync.reload();
        if(watch) {
            watch = false;
            callback();
        }
    };
    return gulp.src([path.join(conf.paths.tmpts, '/serve/app/app.module.js')])
        .pipe($.webpack(webpackOptions, null, webpackChangeHandler))
        .pipe(gulp.dest(path.join(conf.paths.tmp, '/serve/app')))



   // return webpack(false);
  /*return gulp.src([path.join(conf.paths.tmp, '/serve/app/app.module.js')])
      .pipe($.babel())
      //.pipe($.concat('index.module.js'))
      .pipe(gulp.dest(path.join(conf.paths.tmp, '/serve/app')))
      .pipe(browserSync.reload({ stream: true }))
      .pipe($.size())*/
});