'use strict';

var gulp = require('gulp');

var $ = require('gulp-load-plugins')({
    pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
});

module.exports = function(options) {

    gulp.task('copy-assets', function () {
        return gulp.src([
            options.dist + '/{assets,fonts,scripts,styles}/**/*'
        ])
            .pipe(gulp.dest(options.deploy + '/public'));
    });

    gulp.task('copy-templates', function () {
        return gulp.src([
            options.dist + '/*.twig'
        ])
            .pipe(gulp.dest(options.deploy + '/views'));
    });

/*    gulp.task('clean', ['tsd:purge'], function (done) {
        $.del([options.dist + '/', options.tmp + '/'], done);
    });*/

    gulp.task('deploy', ['copy-assets', 'copy-templates']);
};
