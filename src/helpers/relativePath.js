let path = require('path')
module.exports = function (filePath, srcPath, options) {
    filePath = filePath.split('.tmp')[1]
    return path.relative(filePath + '/..', srcPath)
}
