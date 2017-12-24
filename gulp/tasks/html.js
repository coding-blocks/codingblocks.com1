let gulp = require('gulp')
let gulpData = require("gulp-data")
let changed = require('gulp-changed')
let using = require('gulp-using')
let hb = require('gulp-hb')
let ext = require('gulp-ext-replace')
let minifyHtml = require('gulp-htmlmin')
let path = require('path')
let config = require('../config').html
let lrConfig = require('../config').liveReload
let cached = require('gulp-cached')
const gulpif = require('gulp-if')
const embedlr = require('gulp-embedlr')


gulp.task('html', function () {

    return new Promise((resolve, reject) => {
        let stream = gulp.src([config.src + '/**/*.hbs', "!" + config.partialsSrc + '/**/*.hbs'])
            .pipe(gulpData(function (file) {
                try {
                    return require(file.path.replace('.hbs', '.json'));
                } catch (e) {
                    console.log("No JSON for " + file.path)
                    return ({})
                }
            }))
            .pipe(gulpData(function (file) {
                return require('../../' + config.dataSrc + '/courses.json');
            }))
            .pipe(gulpData(function (file) {
                return require('../../' + config.dataSrc + '/bootcamps.json');
            }))
            .pipe(gulpData(function (file) {
                return require('../../' + config.dataSrc + '/reviews.json');
            }))
            .pipe(gulpData(function (file) {
                return require('../../' + config.dataSrc + '/navbar.json');
            }))
            .pipe(gulpData(function (file) {
                return require('../../' + config.dataSrc + '/footer.json');
            }))
            .pipe(gulpData(function (file) {
                return require('../../' + config.dataSrc + '/team.json');
            }))
            .pipe(gulpData(function (file) {
                return require('../../' + config.dataSrc + '/packages.json');
            }))
            .pipe(hb({
                partials: config.partialsSrc + '/**/*.hbs',
                helpers: config.helpersSrc + '/**/*.js',
                data: [config.src + '/**/*.json', config.dataSrc + '/**/*.json']
            }))
            .pipe(using())
            .pipe(ext('.html'))
            .pipe(cached('html'))
            .pipe(minifyHtml({collapseWhitespace: true}))
            .pipe(gulpif((gulp.seq.indexOf('watch') !== -1), embedlr(lrConfig)))
            .pipe(gulp.dest(config.dest))
        stream.on('finish', resolve)
        stream.on('error', reject)
    })
})


