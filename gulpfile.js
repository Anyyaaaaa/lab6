const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));

function styles() {
    console.log('Running styles task...');
    return src('src/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(dest('dist/css'));
}

function watcher() {
    watch('src/scss/**/*.scss', styles);
}

exports.default = series(styles, watcher);
