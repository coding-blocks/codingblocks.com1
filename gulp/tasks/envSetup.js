let gulp = require('gulp')
let changed = require('gulp-changed')
let using = require('gulp-using')

let config = require('../config').envSetup

gulp.task('envSetup', function () {
    return gulp.src(config.src)
        .pipe(using())
        .pipe(gulp.dest(config.dest))
})
