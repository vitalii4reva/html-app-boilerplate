const gulp = require('gulp');
const runseq = require('run-sequence');
const stylelint = require('gulp-stylelint');

gulp.task('lint:styles', () => {
  return gulp.src('app/styles/**/*.scss')
    .pipe(stylelint({
      failAfterError: false, // disable fail after error
      reporters: [{
        formatter: 'string',
        console: true
      }]
    }));
});

gulp.task('lint', function(){
  runseq(
    'lint:styles'
  );
});
