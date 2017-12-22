const gulp = require('gulp')
const serve = require('gulp-serve')
const opn = require('opn')
const lrConfig = require('../config').liveReload
const livereload = require('gulp-livereload')


gulp.task('serve', ['build'], serve({
  root: 'dist',
  port: '4567'
}));


gulp.task('watch', ['serve'], () => {
  livereload.listen(lrConfig)
  gulp.watch(['src/**/*.json', 'src/**/*.hbs'], ['html'])
  opn('http://127.0.0.1:4567')
})