const dest = "dist"
const src = 'src'
const tmp = '.tmp'
const assets = 'assets'
const imagesSrc = 'assets/images'
const scriptsSrc = 'assets/scripts'
const stylesSrc = 'assets/styles'
const partialsSrc = 'partials'
const helpersSrc = 'helpers'
const dataSrc = 'data'

module.exports = {
    compress: {
        src: src,
        dest: src,
        imagesSrc: '/' + imagesSrc,
    },
    validate: {},
    clean: {
        src: [
            tmp,
            dest
        ]
    },
    envSetup: {
        src: [
            src + '/**/*.*',
            '!' + src + '/**/..*',
            '!' + src + '/' + assets + '/**/*.*'
        ],
        dest: tmp
    },
    compliePartials: {
        name: "/index",
        partialsSrc: tmp + '/' + partialsSrc,
        partialsDest: tmp + '/' + partialsSrc
    },
    html: {
        src: tmp,
        dest: dest,
        partialsSrc: tmp + '/' + partialsSrc,
        helpersSrc: tmp + '/' + helpersSrc,
        dataSrc: tmp + '/' + dataSrc
    },
    minify: {
        src: src,
        dest: dest,
        assets: assets,
        imagesSrc: '/' + imagesSrc,
        scriptsSrc: '/' + scriptsSrc,
        stylesSrc: '/' + stylesSrc
    },
    completeMigrate: {
        src: [
            tmp + "/**/*.*",
            "!" + tmp + "/**/*.{hbs,json}",
            "!" + tmp + '/' + partialsSrc + "/**/*.*",
            "!" + tmp + '/' + helpersSrc + "/**/*.*",
            "!" + tmp + '/' + dataSrc + "/**/*.*"
        ],
        jsonSrc: [
            tmp + '/manifest.json'
        ],
        dest: dest
    },
    injectScripts: {
        targetSrc: dest,
        scriptSrc: [
            dest + '/assets/scripts/jquery.min.js',
            dest + '/assets/scripts/jquery.flip.min.js',
            dest + '/assets/scripts/jquery.waypoints.min.js',
            dest + '/assets/scripts/bootstrap.min.js',
            dest + '/assets/scripts/flexslider.min.js',
            dest + '/assets/scripts/twitterfetcher.min.js',
            dest + '/assets/scripts/smooth-scroll.min.js',
            dest + '/assets/scripts/parallax.js',
            dest + '/assets/scripts/scripts.js'
        ]
    },
    injectStyles: {
        targetSrc: dest,
        styleSrc: [
            dest + '/assets/styles/font-awesome.min.css',
            dest + '/assets/styles/themify-icons.css',
            dest + '/assets/styles/bootstrap.css',
            dest + '/assets/styles/flexslider.css',
            dest + '/assets/styles/theme-fire.css',
            dest + '/assets/styles/custom.css',
            dest + '/assets/styles/pe-icon-7-stroke.css',
            dest + '/assets/styles/et-line-icons.css',
            dest + '/manifest.json'
        ]
    }
    ,
    cleanBuild: {
        src: [
            tmp
        ]
    }
}
