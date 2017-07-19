let gulp = require('gulp')
let inject = require('gulp-inject')
let using = require('gulp-using')

let config = require('../config.js').include

gulp.task('include', ['envSetup'], function () {
    let json = require('../../' + config.includeSrc + config.name + '.json')
    let stream = gulp.src(config.hbsSrc + '/**/*.hbs')
    json.include.map(include => {
        stream = stream
            .pipe(using())
            .pipe(inject(gulp.src(config.includeSrc + include.injectName + '.html'), {
                name: 'include:' + include.injectName,
                transform: function (filePath, file) {
                    return file.contents.toString('utf8')
                }
            }))
            .pipe(gulp.dest(config.hbsSrc))
    })
    return new Promise((resolve, reject) => {
        stream.on('finish', resolve)
        stream.on('error', reject)
    })

})
