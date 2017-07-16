let gulp = require('gulp')
let hb = require('gulp-hb')
let ext = require('gulp-ext-replace')

let config = require('../config').html

gulp.task('html', ['envSetup'], function () {
    for (let template of config.templates) {
        let indexJson = require('../../' + config.src + template.src + template.name + '.json')
        for(let page of indexJson.pages){
            gulp.src(config.src + template.src + page.name + '.hbs')
                .pipe(hb().data(page))
                .pipe(ext('.html'))
                .pipe(gulp.dest(config.dest + template.src))
        }
    }
})
