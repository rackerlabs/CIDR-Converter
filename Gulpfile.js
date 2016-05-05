var gulp = require('gulp'),
    webserver = require('gulp-webserver'),
    webpack = require('webpack-stream'),
    reload = require('gulp-livereload'),
    webpackConfig = require("./webpack.config.js");

    gulp.task('default', ['webpack'], function() {
      gulp.watch('./app/**/*', ['webpack']);
      return gulp
                .src('./src/')
                .pipe(webserver({livereload: true}));
    });

    gulp.task('webpack', function() {
      return gulp
                .src('./app/App.js')
                .pipe(webpack(webpackConfig))
                .pipe(gulp.dest('./'))
    });
