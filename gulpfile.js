var gulp = require('gulp')
var requireDir = require('require-dir')

requireDir('./gulp/tasks', {recurse: true})

gulp.task('default', function () {
    console.log()
    var siteWideContent = gulp.src(['src/**/*.*', '!src/**/..*'])
    siteWideContent.pipe(gulp.dest('tmp'))
});
