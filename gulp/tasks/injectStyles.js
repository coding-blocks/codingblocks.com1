let gulp = require('gulp')
let using = require('gulp-using')
let inject = require('gulp-inject')
let config = require('../config.js').injectStyles

gulp.task('injectStyles', ['completeMigrate'], function () {
    let styleStream = gulp.src(config.targetSrc + '/**/*.html')
        .pipe(using())
        .pipe(inject(gulp.src(config.styleSrc, {read: false}), {
            starttag: '<!--inject:head:{{ext}}-->',
            relative: true
        }))
        .pipe(gulp.dest(config.targetSrc));

    return new Promise((resolve, reject) => {
        styleStream.on('finish', resolve)
        styleStream.on('error', reject)
    });
});
