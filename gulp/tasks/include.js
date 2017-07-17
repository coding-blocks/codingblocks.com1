let gulp = require('gulp')
let inject = require('gulp-inject')

let config = require('../config.js').include

gulp.task('include', ['envSetup'], function () {
    let json = require('../../' + config.includeSrc + config.name + '.json')
    //json.include(  )
    const promises = json.include.map(include => new Promise( (resolve, reject) => {
        console.log(include.name)
        const stream = gulp.src(config.hbsSrc + '/**/*.hbs')
            .pipe(inject(gulp.src(config.includeSrc + include.injectName + '.html'), {
                starttag: '<!-- inject:head:{{ext}} -->',
                transform: function (filePath, file) {
                    console.log(filePath + "\n" + file.contents.toString('utf8'))
                    return file.contents.toString('utf8')
                }
            }))
        stream.on('finish', resolve)
        stream.on('error', reject)
    }))

    return Promise.all(promises)
})
