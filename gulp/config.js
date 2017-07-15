var dest = "dist"
var src = 'src'
var tmp = '.tmp'
var imagesSrc = 'assets/images'
var scriptsSrc = 'assets/scripts'
var stylesSrc = 'assets/scripts'

module.exports = {
    complieAssets: {
        imagesSrc: [
            tmp + '/' + imagesSrc + '/**.*'
        ],
        imagesDest: dest + '/' + imagesSrc + '/**.*',
        scriptsSrc: [
            tmp + '/' + scriptsSrc + '/**.*'
        ],
        scriptsDest: dest + '/' + scriptsSrc + '/**.*',
        stylesSrc: [
            tmp + '/' + stylesSrc + '/**.*'
        ],
        stylesDest: dest + '/' + stylesSrc + '/**.*',
        src: [
            tmp + '/**.*',
            '!' + tmp + '/' + imagesSrc + '/**.*'
        ],
        dest: dest
    },
    clean: {
        src: [
            tmp,
            dest
        ]
    },
    envSetup: {
        src: [
            src + '/**/*.*',
            '!' + src + '/**/..*'
        ],
        dest: tmp
    }
}
