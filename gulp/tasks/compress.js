let gulp = require('gulp')
let changed = require('gulp-changed')
let using = require('gulp-using')
let imagesMin = require('gulp-imagemin')

let config = require('../config').compress

gulp.task('compress', function () {
    let imagesMinStream = gulp.src(config.src + config.imagesSrc + '/**/*.*')
        .pipe(imagesMin())
        .pipe(using())
        .pipe(gulp.dest(config.dest + config.imagesSrc))

    return new Promise((resolve, reject) => {
        imagesMinStream.on('finish', resolve)
        imagesMinStream.on('error', reject)
    })
})
