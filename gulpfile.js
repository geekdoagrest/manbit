var gulp        = require('gulp'),
    htmlmin     = require('gulp-image'),
    htmlmin     = require('gulp-htmlmin'),
    less        = require('gulp-less'),
    minifyCSS   = require('gulp-minify-css'),
    minifyJS    = require('gulp-minify'),
    image       = require('gulp-image'),
    webp        = require('gulp-webp'),
    connect     = require('gulp-connect');

gulp.task('serve', function() {
  return connect.server({
    root: 'dist'
  });
});

gulp.task('html', function(){
    return gulp.src('src/*.html')
    .pipe(htmlmin({collapseWhitespace: true, minifyCSS: true, minifyJS: true}))
    .pipe(gulp.dest('dist'));
});

gulp.task('less', function(){
    return gulp.src('src/css/*.less')
    .pipe(less())
    .pipe(minifyCSS())
    .pipe(gulp.dest('dist/css'))
});

gulp.task('js', function(){
    return gulp.src('src/js/*.js')
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

gulp.task('build', gulp.series('html'));
gulp.task('watch', function(){
    gulp.watch('src/*.html', gulp.series('html'));
    gulp.watch('src/*.less', gulp.series('less'));
});
