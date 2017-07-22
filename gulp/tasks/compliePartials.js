let gulp = require('gulp')
let using = require('gulp-using')
let hb = require('gulp-hb')
let gulpData = require("gulp-data")

let config = require('../config.js').compliePartials
gulp.task('compliePartials', ['envSetup'], function () {

    let indexJson = require('../../' + config.partialsSrc + config.name + '.json')
    let promises = indexJson.partials.map(partial => {
        return new Promise((resolve, reject) => {
            let stream = gulp.src(config.partialsSrc + '/' + partial + '.hbs')
                .pipe(gulpData(function (file) {
                    try {
                        return require(file.path.replace('.hbs', '.json'));
                    } catch (e) {
                        console.log("No JSON for " + file.path)
                        return ({})
                    }
                }))
                .pipe(hb()
                    .partials(config.partialsSrc + '/**/*.hbs')
                    .data(config.partialsSrc + '/' + partial + '.json')
                )
                .pipe(using())
                .pipe(gulp.dest(config.partialsDest))

            stream.on('finish', resolve)
            stream.on('error', reject)
        });
    })

    return Promise.all(promises);
})
