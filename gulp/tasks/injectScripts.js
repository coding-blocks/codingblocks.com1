let gulp = require('gulp')
let using = require('gulp-using')
let inject = require('gulp-inject')
let config = require('../config.js').injectScripts
let lrConfig = require('../config').liveReload
let embedlr = require('gulp-embedlr')

gulp.task('injectScripts', ['injectStyles'], function () {
    let scriptStream = gulp.src(config.targetSrc + '/**/*.html')
        .pipe(inject(gulp.src(config.scriptSrc, {read: false}), {
            starttag: '<!--inject:script:{{ext}}-->',
            relative: true
        }))
        .pipe(embedlr(lrConfig))
        .pipe(gulp.dest(config.targetSrc));

    return new Promise((resolve, reject) => {
        scriptStream.on('finish', resolve)
        scriptStream.on('error', reject)
    });
});
