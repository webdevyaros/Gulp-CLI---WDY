/* Variables initializing */
var gulp = require('gulp'); // gulp init
var sass = require('gulp-sass'); // gulp sass init
var browserSync = require('browser-sync').create(); // Browser sync init

/* Files to build */

// JS build task
gulp.task('js:build', function() {
    return gulp.src('./app/js/**/*.js')
      .pipe(gulp.dest('./dist/js'))
});

// CSS build task
gulp.task('css:build', function() {
    return gulp.src('./app/sass/**/*.+(scss|sass)')
      .pipe(sass())
      .pipe(gulp.dest('./dist/css'))
      .pipe(browserSync.reload({
          stream: true
      }))
});

// HTML build
gulp.task('html:build', function() {
    return gulp.src('./app/*.html')
      .pipe(gulp.dest('./dist'))
});


/* Tasks to run */

// Gulp watch
gulp.task('watch', ['browserSync', 'css:build', 'html:build'] , function() {
    // Watch css files
    gulp.watch('./app/sass/**/*.+(scss|sass)', [ 'css:build' ]);
    gulp.watch('./app/js/**/*.js', [ 'js:build', browserSync.reload ]);
    gulp.watch('./app/*.html', [ 'html:build', browserSync.reload ]);
});

// Enable Gulp to spin up a server using Browser Sync
gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: 'dist'
        }
    })
});





