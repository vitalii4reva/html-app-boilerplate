const gulp   = require('gulp');
// const config = require('../config');

gulp.task('watch',
    ['copy:watch',

    // 'list-pages:watch',
    'images:watch',
    'webpack:watch',
    'styles:watch'
]);
