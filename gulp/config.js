const dest = "dist"
const src = 'src'
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
    clean: {
        src: [
            dest
        ]
    },
    html: {
        src: src,
        dest: dest,
        partialsSrc: src + '/' + partialsSrc,
        helpersSrc: src + '/' + helpersSrc,
        dataSrc: src + '/' + dataSrc
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
            src + "/**/*.*",
            "!" + src + "/**/*.{hbs,json}",
            "!" + src + '/' + partialsSrc + "/**/*.*",
            "!" + src + '/' + helpersSrc + "/**/*.*",
            "!" + src + '/' + dataSrc + "/**/*.*",
            "!" + src + '/' + stylesSrc + "/**/*.*",
            "!" + src + '/' + scriptsSrc + "/**/*.*",
            "!" + src + '/' + imagesSrc + "/**/*.*"
        ],
        jsonSrc: [
            src + '/manifest.json'
        ],
        dest: dest
    },
    liveReload: {
        targetSrc: dest,
        port: 7654,
        basePath: 'dist'
    },
    dev: {
        src: src,
        dest: dest,
        assets: assets,
        cssSrc: stylesSrc,
        imgSrc: imagesSrc,
        jsSrc: scriptsSrc,
        jsonSrc: src,
        hbsSrc: src,
        partialsSrc: src + '/' + partialsSrc,
        helpersSrc: src + '/' + helpersSrc,
        dataSrc: src + '/' + dataSrc
    },
    swConfig: {
        global: dest
    }
}
