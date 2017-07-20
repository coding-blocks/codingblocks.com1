let gulp = require('gulp')
let using = require('gulp-using')
let hb = require('gulp-hb')

let config = require('../config.js').compliePartials
gulp.task('compliePartials', ['include'], function () {

    let indexJson = require('../../' + config.partialsSrc + config.name + '.json')
    let promises = indexJson.partials.map(partial => {
        return new Promise((resolve, reject) => {
            let stream = gulp.src(config.partialsSrc + '/' + partial.partialName + '.hbs')
                .pipe(hb()
                    .partials(config.partialsSrc + '/**/*.hbs')
                    .data(partial)
                )
                .pipe(using())
                .pipe(gulp.dest(config.partialsDest))

            stream.on('finish', resolve)
            stream.on('error', reject)
        });
    })

    return Promise.all(promises);
})
