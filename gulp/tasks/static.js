const gulp = require('gulp');

gulp.task('static', () => {
  return gulp.src('static/**/*')
    .pipe(gulp.dest('dist/'))
});

gulp.task('static:watch', () => {
  gulp.watch('static/**/*', ['static']);
});
