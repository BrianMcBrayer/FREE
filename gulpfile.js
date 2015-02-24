var gulp = require('gulp');
var gulpConfig = require('gulpfile.config.json');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

gulp.task('serve', function() {
  browserSync({
    server: {
      baseDir: gulpConfig.paths.appRoot
    }
  });

  gulp.watch(['*.*'], {cwd: gulpConfig.paths.appRoot}, reload);
});

gulp.task('build:src', function() {
  return gulp.src(gulpConfig.paths.FREEJs)
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(sourcemaps.write(gulpConfig.paths.dist))
    .pipe(gulp.dest(gulpConfig.paths.dist));
});

gulp.task('build:app', function() {
  return gulp.src(gulpConfig.paths.FREEJs)
});

gulp.task('default', function() {
  // place code for your default task here
});
