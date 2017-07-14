var dest = "dist"
var src = 'src'
var tmp = '.tmp'

module.exports = {
    dest: dest,
    src: src,
    tmp: tmp,
    clean: {
        src: [
            tmp,
            dest
        ]
    },
    initBuild: {
        src: [
            'src/**/*.*',
            '!src/**/..*'
        ],
        dest: tmp
    }
}