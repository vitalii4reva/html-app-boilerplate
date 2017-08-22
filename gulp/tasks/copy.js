var gulp   = require('gulp');
var config = require('../config.js');

gulp.task('copy:fonts', function() {
    return gulp
        .src(config.src.fonts + '/*.{ttf,eot,woff,woff2}')
        .pipe(gulp.dest(config.dest.fonts));
});

gulp.task('copy:lib', function() {
    return gulp
        .src(config.src.lib + '/**/*.*')
        .pipe(gulp.dest(config.dest.lib));
});

gulp.task('copy:rootfiles', function() {
    return gulp
        .src(config.src.root + '/*.*')
        .pipe(gulp.dest(config.dest.root));
});

gulp.task('copy:static', function() {
  return gulp
      .src(config.src.static + '/*.*', {
        dot: true
      })
      .pipe(gulp.dest(config.dest.root));
});

gulp.task('copy:html', function() {
    return gulp
        .src(config.src.root + '/*.html')
        .pipe(gulp.dest(config.dest.root));
});

gulp.task('copy:img', function() {
    return gulp
        .src([
            config.src.img + '/**/*.{jpg,png,jpeg,svg,gif}',
            '!' + config.src.img + '/svgo/**/*.*'
        ])
        .pipe(gulp.dest(config.dest.img));
});

gulp.task('copy', [
    // 'copy:img',
    'copy:html',
    // 'copy:rootfiles',
    'copy:static',
    // 'copy:lib',
    'copy:fonts'
]);
gulp.task('copy:watch', function() {
    gulp.watch(config.src.root + '/**/*.*', ['copy']);
});
