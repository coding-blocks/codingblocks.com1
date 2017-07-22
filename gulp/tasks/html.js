let gulp = require('gulp')
let gulpData = require("gulp-data")
let changed = require('gulp-changed')
let using = require('gulp-using')
let hb = require('gulp-hb')
let ext = require('gulp-ext-replace')
let minifyHtml = require('gulp-htmlmin')
let path = require('path')
let config = require('../config').html

gulp.task('html', ['compliePartials'], function () {

    return new Promise((resolve, reject) => {
        let stream = gulp.src([config.src + '/**/*.hbs', "!" + config.partialsSrc + '/**/*.hbs'])
            .pipe(gulpData(function (file) {
                try {
                    return require(file.path.replace('.hbs', '.json'));
                } catch (e) {
                    console.log("No JSON for " + file.path)
                    return ({})
                }
            }))
            .pipe(hb({
                partials: config.partialsSrc + '/**/*.hbs',
                data: config.src + '/**/*.json'
            }))
            .pipe(using())
            .pipe(ext('.html'))
            .pipe(minifyHtml({collapseWhitespace: true}))
            .pipe(gulp.dest(config.dest))

        stream.on('finish', resolve)
        stream.on('error', reject)
    })
})


