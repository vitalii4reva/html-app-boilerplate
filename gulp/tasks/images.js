const gulp = require('gulp');
const cache = require('gulp-cache');
const imagemin = require('gulp-imagemin');
const gulpIf = require('gulp-if');
const isFile = gulpIf.isFile;
const config = require('../config');

gulp.task('images', () => {
  return gulp.src('app/images/**/*')
    .pipe(gulpIf(isFile, cache(imagemin({
      progressive: true,
      interlaced: true,
      // don't remove IDs from SVGs, they are often used
      // as hooks for embedding and styling
      svgoPlugins: [{cleanupIDs: false}]
    }))
    .on('error', config.errorHandler)))
    .pipe(gulp.dest(config.dest.img));
});

gulp.task('images:watch', function() {
  gulp.watch(config.src.img + '/*.*', ['images']);
});
