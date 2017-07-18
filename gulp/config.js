let dest = "dist"
let src = 'src'
let tmp = '.tmp'
let assets = 'assets'
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
    minify: {
        src: tmp,
        dest: dest,
        imagesSrc: '/' + imagesSrc,
        scriptsSrc: '/' + scriptsSrc,
        stylesSrc: '/' + stylesSrc
    },
    include: {
        name: 'index',
        includeSrc: tmp + '/' + includeSrc + '/',
        hbsSrc: tmp
    },
    injectAssets: {
        src: dest,
        hbsSrc: tmp
    },
    injectComponents: {},
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
    }
}
