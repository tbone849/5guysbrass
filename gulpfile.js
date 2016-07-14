var gulp = require('gulp');
var jshint = require('gulp-jshint');
var connect = require('gulp-connect');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var cleanCSS = require('gulp-clean-css');


// run localhost:8080 server for public 
gulp.task('connect', function () {
  connect.server({
    port: 8080,
    livereload: true
  });
});

// Run sass and concatenate all the files
gulp.task('styles', function() {
  return gulp.src('./styles/scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('styles.css'))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('./styles'))
    .pipe(connect.reload());
});

// JavaScript linting task
gulp.task('jshint', function() {
  return gulp.src('./js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('watch', ['build'], function() {
  gulp.watch('index.html', ['build'] );
  gulp.watch('./js/*.js', ['build']);
  gulp.watch('./styles/scss/*.scss', ['build']);
});

gulp.task('default', ['connect', 'watch', 'jshint']);

gulp.task('build', ['styles', 'jshint']);
