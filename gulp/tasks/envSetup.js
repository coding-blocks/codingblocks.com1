var gulp = require('gulp')

var config = require('../config').envSetup

gulp.task('envSetup', ['clean'], function () {
    var siteWideContent = gulp.src(config.src)

    return siteWideContent
        .pipe(gulp.dest(config.dest))
})