let gulp = require('gulp')
let clean = require('gulp-clean')

let config = require('../config').clean

gulp.task('clean',['validate'], function () {
    return gulp.src(config.src, {read: false}, {force: true})
        .pipe(clean())
})

