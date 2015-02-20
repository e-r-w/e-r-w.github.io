var gulp = require('gulp');
var concat = require('gulp-concat');
var ngmin = require('gulp-ngmin');
var sass = require('gulp-sass');
var uglifycss = require('gulp-uglifycss');
var del = require('del');
var sequence = require('gulp-sequence');

var SCRIPTS = [
	'scripts/app/*.js',
	'scripts/app/**/*.js'
];

var VENDOR_SCRIPTS = [
    'vendor/**/*.js',
    '!vendor/**/*.spec.js',
    '!vendor/**/karma.conf.js'
];

var STYLES = [
	'styles/*.scss',
	'styles/**/*.scss'
];

var VENDOR_STYLES = [
    'vendor/*.css',
    'vendor/**/*.css'
];

var ASSETS = [
    'images/**/*'
];

var DEST = 'build';

gulp.task('default', function(cb){
  sequence('clean', 'build', cb);
});

gulp.task('build', function(){
    gulp.start(
        'styles',
        'assets',
        'scripts', 
        'vendor-scripts',
        'vendor-styles'
    );
});

gulp.task('clean', function(cb) {
  del(DEST, cb);
});

gulp.task('watch', function() {
  gulp.watch(STYLES, ['styles']);
  gulp.watch(SCRIPTS, ['scripts']);
});

  
gulp.task('scripts', function() {
  return gulp.src(SCRIPTS)
    .pipe(concat('build.js'))
    .pipe(gulp.dest(DEST)); 
});

gulp.task('vendor-scripts', function() {
  return gulp.src(VENDOR_SCRIPTS)
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest(DEST)); 
});

gulp.task('styles', function() {
  return gulp.src(STYLES)
    .pipe(sass({errLogToConsole: true}))
    .pipe(uglifycss())
    .pipe(concat('build.css'))
    .pipe(gulp.dest(DEST)); 
});

gulp.task('vendor-styles', function() {
  return gulp.src(VENDOR_STYLES)
    .pipe(concat('vendor.css'))
    .pipe(gulp.dest(DEST)); 
});

gulp.task('assets', function() {
  return gulp.src(ASSETS, { base: './' })
    .pipe(gulp.dest(DEST)); 
});