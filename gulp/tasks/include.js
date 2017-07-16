let gulp = require('gulp')
let inject = require('gulp-inject')

let config = require('../config.js').include

gulp.task('include', ['envSetup'], function () {
    let json = require('../../' + config.includeSrc + config.name + '.json')
    for (let include of json.include) {
        console.log(include.name)
        gulp.src(config.hbsSrc + '/**/*.hbs')
            .pipe(inject(gulp.src(config.includeSrc + include.injectName + '.html'), {
                name: include.injectName,
                transform: function (filePath, file) {
                    return file.contents.toString('utf8')
                }
            }))
    }
})
