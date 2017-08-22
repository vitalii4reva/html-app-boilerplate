const gulp = require('gulp');
const gutil = require( 'gulp-util' );
const ftp = require( 'vinyl-ftp' );
const config = require('../config');
const notify = require('gulp-notify');

// helper function to build an FTP connection based on our configuration
function getFtpConnection() {
  return ftp.create({
      host: config.ftp.host,
      port: config.ftp.port,
      user: config.ftp.user,
      password: config.ftp.password,
      parallel: 5,
      log: gutil.log
  });
}

/**
 * Deploy task.
 * Copies the new files to the server
 */
gulp.task('ftp', function() {

  const conn = getFtpConnection();
  process.chdir('./dist');

  return gulp.src(config.ftp.localFilesGlob, { base: './', buffer: false })
    .pipe( conn.newer( config.ftp.remoteFolder ) ) // only upload newer files
    .pipe( conn.dest( config.ftp.remoteFolder ) )
  ;
});

/**
 * Watch deploy task.
 * Watches the local copy for changes and copies the new files to the server whenever an update is detected
 */
gulp.task('ftp-deploy-watch', function() {

  const conn = getFtpConnection();

  gulp.watch(config.ftp.localFilesGlob)
  .on('change', function(event) {
    const args = Array.prototype.slice.call(arguments);
    notify.onError({
        title: 'Changes detected! Uploading file "' + event.path + '", ' + event.type,
        // title: 'Compile Error',
        message: '<%= error.message %>',
        sound: 'Submarine'
    }).apply(this, args);
    this.emit('end');
    // console.log('Changes detected! Uploading file "' + event.path + '", ' + event.type);

    process.chdir('./dist');

    return gulp.src( [event.path], { base: '.', buffer: false } )
      .pipe( conn.newer( config.ftp.remoteFolder ) ) // only upload newer files
      .pipe( conn.dest( config.ftp.remoteFolder ) )
    ;
  });
});
