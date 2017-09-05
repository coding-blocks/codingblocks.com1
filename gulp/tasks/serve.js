const gulp = require('gulp')
const serve = require('gulp-serve')
const opn = require('opn')
let config = require('../config').cleanBuild


gulp.task('server', ['build'], serve({
  root: 'dist',
  port: '4567'
}));
gulp.task('serve', ['server'], () => {
  gulp.watch('src/**/*.json', ['html', 'build'])
  opn('http://127.0.0.1:4567')
})