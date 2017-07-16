var dest = "dist"
var src = 'src'
var tmp = '.tmp'
var imagesSrc = 'assets/images'
var scriptsSrc = 'assets/scripts'
var stylesSrc = 'assets/scripts'

module.exports = {
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
    },
    html: {
        src: tmp,
        dest: dest,
        templates: [
            {
                name: 'index',
                src: '/'
            },
            {
                name: 'index',
                src: '/courses/'
            }
        ]
    },
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
    inject: {

    }
}
