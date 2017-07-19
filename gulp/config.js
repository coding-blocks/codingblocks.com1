const dest = "dist"
const src = 'src'
const tmp = '.tmp'
const assets = 'assets'
const imagesSrc = 'assets/images'
const scriptsSrc = 'assets/scripts'
const stylesSrc = 'assets/styles'
const includeSrc = 'include'

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
    include: {
        name: 'index',
        includeSrc: tmp + '/' + includeSrc + '/',
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
    },
    minify: {
        src: src,
        dest: dest,
        assets: assets,
        imagesSrc: '/' + imagesSrc,
        scriptsSrc: '/' + scriptsSrc,
        stylesSrc: '/' + stylesSrc
    },
    cleanBuild: {
        src: [
            tmp
        ]
    }
}
