const gulp = require('gulp')
const serve = require('gulp-serve')
const opn = require('opn')
const lrConfig = require('../config').liveReload
const livereload = require('gulp-livereload')
const inject = require('gulp-inject')
const using = require('gulp-using')
const embedlr = require('gulp-embedlr')

gulp.task('embedlr', ['build'], () => {
    let scriptStream = gulp.src(lrConfig.targetSrc + '/**/*.html')
        .pipe(embedlr(lrConfig))
        .pipe(gulp.dest(lrConfig.targetSrc));

    return new Promise((resolve, reject) => {
        scriptStream.on('finish', resolve)
        scriptStream.on('error', reject)
    });
})


gulp.task('serve', ['embedlr'], serve({
  root: 'dist',
  port: '4567'
}));


gulp.task('watch', ['serve'], () => {
  livereload.listen(lrConfig)
  gulp.watch(['src/**/*.json', 'src/**/*.hbs'], ['build'])
  opn('http://127.0.0.1:4567')
})