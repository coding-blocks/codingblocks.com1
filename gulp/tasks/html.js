let gulp = require('gulp')
let hb = require('gulp-hb')
let ext = require('gulp-ext-replace')
let using = require('gulp-using')

let config = require('../config').html

gulp.task('html', ['include'], function () {
    let stream
    config.templates.map(template => {
        let indexJson = require('../../' + config.src + template.src + template.name + '.json')
        indexJson.pages.map(page => {
            stream = gulp.src(config.src + template.src + page.name + '.hbs')
                .pipe(using())
                .pipe(hb().data(page))
                .pipe(ext('.html'))
                .pipe(gulp.dest(config.dest + template.src))
        })
    })

    return new Promise((resolve, reject) => {
        stream.on('finish', resolve)
        stream.on('error', reject)
    })

})

