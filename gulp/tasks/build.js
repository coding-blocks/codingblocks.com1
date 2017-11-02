let gulp = require('gulp')
    , swPrecache = require('sw-precache')
    , swConfig = require('../config').swConfig;

gulp.task('build', ['completeMigrate'], function () {
    swPrecache.write(swConfig.global + '/sw.js', {
        staticFileGlobs: [global + '/**/*.{js,html,css,png,jpg,jpeg,json,xml,gif,svg,eot,ttf,woff}'],
        stripPrefix: global,
        skipWaiting: true,
        runtimeCaching: [
            {
                urlPattern: /^https:\/\/graph\.facebook.com\//,
                handler: 'networkFirst',
                options: {
                    cache: {
                        name: 'events'
                    }
                }
            },
            {
                urlPattern: /.*assets\/.*/,
                handler: 'networkFirst',
                options: {
                    cache: {
                        name: 'assets'
                    }
                }
            },
            {
                urlPattern: /.*/,
                handler: 'networkFirst',
                options: {
                    cache: {
                        name: 'src'
                    }
                }
            }
        ]
    });
})
