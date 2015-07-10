'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var $ = require('gulp-load-plugins')({
    pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
});



gulp.task('copy-assets', ['build'], function () {
    return gulp.src([
        conf.paths.dist + '/{assets,fonts,scripts,styles}/**/*'
    ])
        .pipe(gulp.dest(conf.paths.deploy));
});
gulp.task('copy-assets:dev', ['build:dev'], function () {
    return gulp.src([
        conf.paths.dist + '/{assets,fonts,scripts,styles}/**/*'
    ])
        .pipe(gulp.dest(conf.paths.deploy));
});

gulp.task('deploy', ['copy-assets']);

gulp.task('deploy:dev', ['build:dev'], function(){
    gulp.start('copy-assets:dev')
});


