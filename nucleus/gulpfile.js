"use strict";

var gulp = require('gulp');
var sass = require('gulp-sass');

var copydir = require('copy-dir');

var exec = require('child_process').exec;

var runSequence = require('run-sequence');

gulp.task('sass', function() {
    return gulp.src('../src/sass/main.scss')
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(gulp.dest('../nucleus/dist'));

});

gulp.task('styleguide', function() {
    exec('nucleus --config config.nucleus.json', function(err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        console.log(err);
    });
})

gulp.task('copy', function() {
    copydir('../src/assets/images', '../nucleus/styleguide/assets/images', function(error) {
        if (error) {
            console.log("Error:", error);
        } else {
            console.log("Folder Copy Success");
        }
    })
});

gulp.task('build', function(callback) {
    runSequence(['sass', 'styleguide', 'copy'], callback);
});