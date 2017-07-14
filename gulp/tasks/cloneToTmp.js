var gulp = require('gulp')

var config = require('../config').initBuild

gulp.task('cloneToTmp', ['clean'], function () {
    var siteWideContent = gulp.src(config.src)
    siteWideContent.pipe(gulp.dest(config.dest))
})