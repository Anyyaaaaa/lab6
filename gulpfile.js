const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();


gulp.task('styles', function () {
    return gulp.src('src/scss/style.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('src/css'))
        .pipe(browserSync.stream()); // оновлення стилів без повного перезавантаження
});

gulp.task('watcher', function () {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });

    gulp.watch('src/scss/**/*.scss', gulp.series('styles'));
    gulp.watch('*.html').on('change', browserSync.reload);
});

gulp.task('default', gulp.series('styles', 'watcher'));
