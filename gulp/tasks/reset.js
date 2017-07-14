var gulp = require('gulp')
var clean = require('gulp-clean')

var config = require('../config').reset

gulp.task('reset', function () {
    return gulp.src(config.src, {read: false}, {force: true})
        .pipe(clean())
})

