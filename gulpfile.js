var gulp = require('gulp');
var gulpConfig = require('./gulpfile.config.json');
var browserSync = require('browser-sync');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var jshint = require('gulp-jshint');
var jshint_stylish = require('jshint-stylish');
var rename = require('gulp-rename');
var del = require('del');
var batch = require('gulp-batch');
var concat = require('gulp-concat');
var reload = browserSync.reload;

gulp.task('serve', function() {
  browserSync({
    server: {
      baseDir: gulpConfig.paths.appRoot
    }
  });

  gulp.watch(gulpConfig.paths.src, ['clean+build+reload']);
});

gulp.task('clean+build+reload', ['clean+build'], reload);
gulp.task('reload', reload);

gulp.task('watch', function() {
  gulp.watch(gulpConfig.paths.src, function() {
    gulp.start('clean+build');
  });
});

gulp.task('lint:js', function() {
  return gulp.src(gulpConfig.paths.src)
    .pipe(jshint())
    .pipe(jshint.reporter(jshint_stylish));
});

gulp.task('clean', function(cb) {
  del(gulpConfig.paths.clean, cb);
});

(function() {

  gulp.task('clean+build:src', ['clean'], buildSrc);
  gulp.task('build:src', buildSrc);

  gulp.task('clean+build:app', ['clean+build:src'], buildApp);
  gulp.task('build:app', ['build:src'], buildApp);

  gulp.task('build', ['build:src', 'build:app']);

  gulp.task('clean+build', ['clean', 'clean+build:src', 'clean+build:app']);

  function buildSrc() {
    return gulp.src(gulpConfig.paths.src)
      .pipe(sourcemaps.init())
      .pipe(concat(gulpConfig.paths.srcFile))
      .pipe(uglify())
      .pipe(rename({extname: '.min.js'}))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest(gulpConfig.paths.dist));
  }

  function buildApp() {
    return gulp.src(gulpConfig.paths.allDist)
      .pipe(gulp.dest(gulpConfig.paths.appJs));
  }

})()


gulp.task('default', ['clean+build']);
