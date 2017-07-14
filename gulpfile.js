var gulp = require('gulp');
var imageMin = require('gulp-imagemin');
var inject = require('gulp-inject');
var clean = require('gulp-clean');


gulp.task('imageMin', function () {
    var imgSrc = 'tmp/images/**/*';
    return gulp.src(imgSrc)
        .pipe(imageMin())
});

gulp.task('injectHead', function () {
    var siteWidehtml = gulp.src('tmp/**/*.html');

    var pathToJSFiles = [
        '../tmp/scripts/jquery.min.js'
        , '../tmp/scripts/bootstrap.min.js'
        , '../tmp/scripts/fbpixel.js'
    ];

    return siteWideContent
        .pipe(inject(gulp.src(pathToFiles, {read: false}), {name: 'headJS'}))

});

gulp.task('default', function () {
    var siteWideContent = gulp.src(['src/**/*.*', '!src/**/..*'])
    siteWideContent.pipe(gulp.dest('tmp'))
});

gulp.task('reset', function () {
    return gulp.src(['tmp', 'build'], {read: false}, {force: true})
        .pipe(clean())
});
