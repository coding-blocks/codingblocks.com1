const gulp = require('gulp'),
    server = require('gulp-webserver'),
    using = require('gulp-using'),
    watch = require('gulp-watch'),
    imgMin = require('gulp-imagemin'),
    jsMin = require('gulp-uglify'),
    cssMin = require('gulp-clean-css'),
    ext = require('gulp-ext-replace'),
    path = require('path'),
    gulpData = require("gulp-data"),
    hb = require('gulp-hb'),
    config = require('../config').dev,
    plumber = require('gulp-plumber');

let hbConfig = {
    partials: config.partialsSrc + '/**/*.hbs',
    helpers: config.helpersSrc + '/**/*.js',
    data: [config.src + '/**/*.json', config.dataSrc + '/**/*.json']
};

gulp.task('dev', ['build'], function () {

    //Watch Images
    watch(config.src + '/' + config.imgSrc + '/**/*.*')
        .pipe(plumber())
        .pipe(imgMin())
        .pipe(using())
        .pipe(gulp.dest(config.dest + '/' + config.imgSrc));

    //Watch JavaScript
    watch(config.src + '/' + config.jsSrc + '/**/*.js')
        .pipe(plumber())
        .pipe(jsMin())
        .pipe(using())
        .pipe(gulp.dest(config.dest + '/' + config.jsSrc));

    //Watch CSS
    watch(config.src + '/' + config.cssSrc + '/**/*.css')
        .pipe(plumber())
        .pipe(cssMin())
        .pipe(using())
        .pipe(gulp.dest(config.dest + '/' + config.cssSrc));

    //Watch HBS Templates
    watch([config.src + '/**/*.hbs', "!" + config.partialsSrc + '/**/*.hbs'])
        .pipe(plumber())
        .pipe(gulpData(function (file) {
            try {
                return require(file.path.replace('.hbs', '.json'));
            } catch (e) {
                console.log("No JSON for " + file.path);
                return ({});
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
            return require('../../' + config.dataSrc + '/packages.json');
        }))
        .pipe(gulpData(function (file) {
            return require('../../' + config.dataSrc + '/team.json');
        })).pipe(hb(hbConfig))
        .pipe(using())
        .pipe(ext('.html'))
        .pipe(gulp.dest(config.dest));

    //Watch Partials
    watch([config.partialsSrc + '/**/*.hbs'], function () {
        gulp.src([config.src + '/**/*.hbs', "!" + config.partialsSrc + '/**/*.hbs'])
            .pipe(plumber())
            .pipe(gulpData(function (file) {
                try {
                    return require(file.path.replace('.hbs', '.json'));
                } catch (e) {
                    console.log("No JSON for " + file.path);
                    return ({});
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
                return require('../../' + config.dataSrc + '/packages.json');
            }))
            .pipe(gulpData(function (file) {
                return require('../../' + config.dataSrc + '/team.json');
            })).pipe(hb(hbConfig))
            .pipe(using())
            .pipe(ext('.html'))
            .pipe(gulp.dest(config.dest));
    });

    //Watch Template JSON Data
    watch([config.src + '/**/*.json', "!" + config.dataSrc + '/**/*.json'], function (file) {
        gulp.src(file.path.replace('.json', '.hbs'))
            .pipe(plumber())
            .pipe(gulpData(function (file) {
                try {
                    return require(file.path.replace('.hbs', '.json'));
                } catch (e) {
                    console.log("No JSON for " + file.path);
                    return ({});
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
                return require('../../' + config.dataSrc + '/packages.json');
            }))
            .pipe(gulpData(function (file) {
                return require('../../' + config.dataSrc + '/team.json');
            })).pipe(hb(hbConfig))
            .pipe(using())
            .pipe(ext('.html'))
            .pipe(gulp.dest(config.dest))
    });

    //Watch Common JSON Data
    watch([config.dataSrc + '/**/*.json'], function (file) {
        gulp.src([config.src + '/**/*.hbs', "!" + config.partialsSrc + '/**/*.hbs'])
            .pipe(plumber())
            .pipe(gulpData(function (file) {
                try {
                    return require(file.path.replace('.hbs', '.json'));
                } catch (e) {
                    console.log("No JSON for " + file.path);
                    return ({});
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
                return require('../../' + config.dataSrc + '/packages.json');
            }))
            .pipe(gulpData(function (file) {
                return require('../../' + config.dataSrc + '/team.json');
            })).pipe(hb(hbConfig))
            .pipe(using())
            .pipe(ext('.html'))
            .pipe(gulp.dest(config.dest));
    });

    //Serve With Hot Reload at http://localhost:5000/
    return gulp.src(config.dest + '/')
        .pipe(plumber())
        .pipe(server({
            livereload: true,
            directoryListing: false,
            port: 5000,
            open: true
        }));

});