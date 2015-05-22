var gulp = require('gulp');
var connect = require('gulp-connect');

var stylus = require('gulp-stylus');
var autoprefixer = require('gulp-autoprefixer');
var minifyCSS = require('gulp-minify-css');
var jade = require('gulp-jade');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var concat = require('gulp-concat');

gulp.task('css', function () {
    gulp.src('source/stylus/main.styl')
        .pipe(stylus({compress: false, paths: ['source/stylus']}))
        .pipe(autoprefixer())
        .pipe(rename('style.css'))
        .pipe(gulp.dest('build'))
        .pipe(connect.reload())
});

gulp.task('uglycss', function () {
    gulp.src('source/stylus/main.styl')
        .pipe(stylus({compress: false, paths: ['source/stylus']}))
        .pipe(autoprefixer())
        .pipe(minifyCSS())
        .pipe(rename('style.css'))
        .pipe(gulp.dest('build'))
        .pipe(connect.reload())
});

gulp.task('html', function() {
  gulp.src('source/jade/main.jade')
    .pipe(jade({pretty:true}))
    .pipe(gulp.dest('build'))
    .pipe(connect.reload())
});

gulp.task('uglyhtml', function() {
  gulp.src('source/jade/main.jade')
    .pipe(jade())
    .pipe(gulp.dest('build'))
    .pipe(connect.reload())
});

gulp.task('connect', function() {
  connect.server({
    root: 'build',
    livereload: true,
    open: true
  });
});

gulp.task('js', function() {
  gulp.src([
    'source/js/*.js'
  ])
    .pipe( concat('functions.js') ) //Tous les fichiers sont concaténé avant d'être minifié
    .pipe(uglify())
    .pipe(gulp.dest('build'))
});

gulp.task('watch', function () {
   gulp.watch('source/stylus/*.styl', ['css']);
   gulp.watch('source/jade/*.jade', ['html']);
   gulp.watch('source/js/*.js', ['js']);
});

gulp.task('garbage', ['uglycss','uglyhtml','js']);
gulp.task('default', ['css', 'html', 'js']);
gulp.task('start', ['connect', 'watch']);
