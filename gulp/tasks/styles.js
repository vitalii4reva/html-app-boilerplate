const gulp         = require('gulp');
const sass         = require('gulp-sass');
const sourcemaps   = require('gulp-sourcemaps');
const postcss      = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const mqpacker     = require('css-mqpacker');
const config       = require('../config');
const csso         = require('postcss-csso');
// const concat       = require('gulp-concat');
// const gulpif       = require('gulp-if');

const sortMediaQueries = (a, b) => {
  let A = a.replace(/\D/g, '');
  let B = b.replace(/\D/g, '');

  if (isMax(a) && isMax(b)) {
    return B - A;
  } else if (isMin(a) && isMin(b)) {
    return A - B;
  } else if (isMax(a) && isMin(b)) {
    return 1;
  } else if (isMin(a) && isMax(b)) {
    return -1;
  }

  return 1;
};

const processors = [
  autoprefixer({
    browsers: ['last 4 versions'],
    cascade: false
  }),
  require('lost'),
  mqpacker({
    sort: sortMediaQueries
  }),
  csso
];

gulp.task('styles', function() {
  return gulp
    .src(config.src.sass + '/*.{sass,scss}')
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: config.production ? 'compact' : 'expanded', // nested, expanded, compact, compressed
      precision: 5
    }))
    .on('error', config.errorHandler)
    .pipe(postcss(processors))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(config.dest.css));
});

gulp.task('styles:watch', function() {
  gulp.watch(config.src.sass + '/**/*.{sass,scss}', ['styles']);
});

function isMax(mq) {
  return /max-width/.test(mq);
}

function isMin(mq) {
  return /min-width/.test(mq);
}

