let dest = "dist"
let src = 'src'
let tmp = '.tmp'
let imagesSrc = 'assets/images'
let scriptsSrc = 'assets/scripts'
let stylesSrc = 'assets/styles'
let includeSrc = 'include'

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
    minify: {
        src: tmp,
        dest: dest,
        scriptsSrc: '/' + scriptsSrc,
        stylesSrc: '/' + stylesSrc
    },
    inject: {}
}
