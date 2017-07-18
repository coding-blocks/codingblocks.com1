let gulp = require('gulp')
let using = require('gulp-using')
let imagesMin = require('gulp-imagemin')

let config = require('../config').compress

gulp.task('compress', function () {
    let imagesMinStream = gulp.src(config.src + config.imagesSrc + '/**/*.*')
        .pipe(using())
        .pipe(imagesMin())
        .pipe(gulp.dest(config.dest + config.imagesSrc))

    return new Promise((resolve, reject) => {
        imagesMinStream.on('finish', resolve)
        imagesMinStream.on('error', reject)
    })
})
