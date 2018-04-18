const gulp = require('gulp');


const cache = require('gulp-cache');
const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');
const size = require('gulp-size');
const gulpIf = require('gulp-if');
const isFile = gulpIf.isFile;
const config = require('../config');

gulp.task('images', () => {
  return gulp.src('src/img/**/*')
    .pipe(gulpIf(isFile, cache(imagemin({
      optimizationLevel: 7,
      progressive: true,
      interlaced: true,
      // don't remove IDs from SVGs, they are often used
      // as hooks for embedding and styling
      svgoPlugins: [{cleanupIDs: false}],
      use: [pngquant()] // imagemin-pngquant
    }))
    .on('error', config.errorHandler)))
    .pipe(gulp.dest(config.dest.img))
    .pipe(size({
      title: 'Size',
      showFiles: true,
      showTotal: false,
    }));
});

gulp.task('images:watch', function() {
  gulp.watch(config.src.img + '/*.*', ['images']);
});
