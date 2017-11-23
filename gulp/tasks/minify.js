let gulp = require('gulp')
let using = require('gulp-using')
let scriptsMin = require('gulp-uglify')
let stylesMin = require('gulp-clean-css')

let config = require('../config').minify

gulp.task('minify', ['html'], function () {
    let imagesMinStream = gulp.src(config.src + config.imagesSrc + '/**/*.*')
        .pipe(using())
        .pipe(gulp.dest(config.dest + config.imagesSrc))

      , scriptsMinStream = gulp.src(config.src + config.scriptsSrc + '/**/*.*')
        .pipe(scriptsMin())
        .pipe(using())
        .pipe(gulp.dest(config.dest + config.scriptsSrc))

      , stylesMinStream = gulp.src(config.src + config.stylesSrc + '/**/*.*')
        .pipe(stylesMin())
        .pipe(using())
        .pipe(gulp.dest(config.dest + config.stylesSrc))

      , assetsMinStream = gulp.src(
        [
            config.src + '/' + config.assets + '/**/*.*',
            '!' + config.src.assets + '/**/..*',
            '!' + config.src + config.imagesSrc + '/**/*.*',
            '!' + config.src + config.scriptsSrc + '/**/*.*',
            '!' + config.src + config.stylesSrc + '/**/*.*'
        ])
        .pipe(using())
        .pipe(gulp.dest(config.dest + '/' + config.assets))

    return Promise.all([
        new Promise((resolve, reject) => {
            imagesMinStream.on('finish', resolve)
            imagesMinStream.on('error', reject)
        }),
        new Promise((resolve, reject) => {
            scriptsMinStream.on('finish', resolve)
            scriptsMinStream.on('error', reject)
        }),
        new Promise((resolve, reject) => {
            stylesMinStream.on('finish', resolve)
            stylesMinStream.on('error', reject)
        }),
        new Promise((resolve, reject) => {
            assetsMinStream.on('finish', resolve)
            assetsMinStream.on('error', reject)
        })
    ]);
})
