const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();

const paths = {
    scss: 'src/scss/style.scss',
    dist: 'dist/css',
    html: 'index.html'
};

// Компіляція SCSS
gulp.task('styles', function () {
    return gulp.src(paths.scss)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(cleanCSS())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.dist))
        .pipe(browserSync.stream()); // Оновлення стилів без перезавантаження сторінки
});

// Синхронізація з браузером
gulp.task('serve', function () {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });

    gulp.watch('src/scss/**/*.scss', gulp.series('styles'));
    gulp.watch(paths.html).on('change', browserSync.reload);
});


gulp.task('default', gulp.series('styles', 'serve'));
