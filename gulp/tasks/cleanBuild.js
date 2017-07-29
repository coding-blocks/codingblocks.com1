let gulp = require('gulp')
let using = require('gulp-using')
let clean = require('gulp-clean')

let config = require('../config').cleanBuild;

gulp.task('cleanBuild', ['injectScripts'], function () {
    return gulp.src(config.src, {read: false}, {force: true})
        .pipe(using())
        .pipe(clean())
})
