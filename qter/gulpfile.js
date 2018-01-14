'use strict';

let gulp      = require('gulp');
let sass      = require('gulp-sass');
let cleanCSS  = require('gulp-clean-css');
let rename    = require('gulp-rename');

gulp.task('sass', function () {
  return gulp.src('./sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'));
});

gulp.task('sass:watch', function () {
  gulp.watch('./sass/**/*.scss', ['sass']);
});

gulp.task('minify-css', () => {
  return gulp.src('css/**/*.css')
    .pipe(cleanCSS({ debug: true }, (details) => {
      console.log(`${details.name}: ${details.stats.originalSize}`);
      console.log(`${details.name}: ${details.stats.minifiedSize}`);
    }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('dist/snapshot'));
});

gulp.task('default', ['sass']);
