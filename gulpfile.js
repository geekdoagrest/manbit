var gulp        = require('gulp'),
    htmlmin     = require('gulp-image'),
    htmlmin     = require('gulp-htmlmin'),
    less        = require('gulp-less'),
    minifyCSS   = require('gulp-minify-css'),
    minifyJS    = require('gulp-minify'),
    image       = require('gulp-image'),
    webp        = require('gulp-webp'),
    replace     = require('gulp-replace'),
    rename      = require("gulp-rename"),
    include     = require("gulp-include"),
    twig        = require("gulp-twig"),
    connect     = require('gulp-connect');

let version = Date.now();

gulp.task('serve', function() {
  return connect.server({
    root: 'dist'
  });
});

gulp.task('html', function(){
    return gulp.src('src/*.html')
    .pipe(replace(/###version##/g, version))
    .pipe(include())
    .pipe(twig())
    .pipe(htmlmin({collapseWhitespace: true, minifyCSS: true, minifyJS: true}))
    .pipe(gulp.dest('dist'));
});

gulp.task('less', function(){
    return gulp.src('src/css/*.less')
    .pipe(include())
    .pipe(less())
    .pipe(minifyCSS())
    .pipe(rename(function (path) {
        path.basename += "-" + version;
    }))
    .pipe(gulp.dest('dist/css'))
});

gulp.task('js', function(){
    return gulp.src('src/js/*.js')
    .pipe(include())
    .pipe(minifyJS())
    .pipe(gulp.dest('dist/js'));
});

gulp.task('img', function(){
    return gulp.src(['src/img/*.png', 'src/img/*.jpg'])
    .pipe(image())
    .pipe(gulp.dest('dist/img'));
});

gulp.task('webp', function(){
    return gulp.src('src/img/*.png', 'src/img/*.jpg')
    .pipe(webp())
    .pipe(gulp.dest('dist/img'));
});

gulp.task('build', gulp.series('html', 'less'));
gulp.task('watch', function(){
    gulp.watch('src/*.html', gulp.series('html'));
    gulp.watch('src/*.less', gulp.series('less'));
    gulp.watch('src/img/*.png', 'src/img/*.jpg', gulp.series('img', 'web'));
});
