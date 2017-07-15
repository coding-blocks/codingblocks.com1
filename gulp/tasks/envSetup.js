var gulp = require('gulp')

var config = require('../config').envSetup

gulp.task('envSetup', ['clean'], function () {
    return gulp.src(config.src)
        .pipe(gulp.dest(config.dest))
})
