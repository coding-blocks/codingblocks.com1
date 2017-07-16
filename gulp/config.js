let dest = "dist"
let src = 'src'
let tmp = '.tmp'
let imagesSrc = 'assets/images'
let scriptsSrc = 'assets/scripts'
let stylesSrc = 'assets/scripts'
let includeSrc = 'include'

module.exports = {
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
            '!' + src + '/**/..*'
        ],
        dest: tmp
    },
    include: {
        name: 'index',
        includeSrc: tmp + '/' + includeSrc + '/',
        hbsSrc: tmp
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
        src: tmp,
        dest: dest,
        imagesSrc: imagesSrc,
        scriptsSrc: scriptsSrc,
        stylesSrc: stylesSrc
    },
    inject: {}
}
