let gulp = require('gulp')
let using = require('gulp-using')
let scriptsMin = require('gulp-uglify')
let stylesMin = require('gulp-clean-css')

let config = require('../config').minify

gulp.task('minify', ['html'], function () {
    let scriptsMinStream = gulp.src(config.src + config.scriptsSrc + '/**/*.*')
        .pipe(using())
        .pipe(scriptsMin())
        .pipe(gulp.dest(config.dest + config.scriptsSrc))

    let stylesMinStream = gulp.src(config.src + config.stylesSrc + '/**/*.*')
        .pipe(using())
        .pipe(stylesMin())
        .pipe(gulp.dest(config.dest + config.stylesSrc))

    return Promise.all([
        new Promise((resolve, reject) => {
            scriptsMinStream.on('finish', resolve)
            scriptsMinStream.on('error', reject)
        }),
        new Promise((resolve, reject) => {
            stylesMinStream.on('finish', resolve)
            stylesMinStream.on('error', reject)
        })
    ]);
})
