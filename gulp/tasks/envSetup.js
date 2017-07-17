let gulp = require('gulp')
let using = require('gulp-using')

let config = require('../config').envSetup

gulp.task('envSetup', ['clean'], function () {
    return gulp.src(config.src)
        .pipe(using())
        .pipe(gulp.dest(config.dest))
})
