let gulp = require('gulp')
let changed = require('gulp-changed')
let using = require('gulp-using')
let hb = require('gulp-hb')
let ext = require('gulp-ext-replace')

let config = require('../config').html

gulp.task('html', ['injectComponents'], function () {

    let promises = config.templates.map(template => {
        return new Promise((resolve, reject) => {
            let indexJson = require('../../' + config.src + template.src + template.name + '.json')
            indexJson.pages.map(page => {
                let stream = gulp.src(config.src + template.src + page.name + '.hbs')
                    .pipe(hb().data(page))
                    .pipe(ext('.html'))
                    .pipe(changed(config.dest + template.src))
                    .pipe(using())
                    .pipe(gulp.dest(config.dest + template.src))
                stream.on('finish', resolve)
                stream.on('error', reject)
            })
        });
    })

    return Promise.all(promises);
})

