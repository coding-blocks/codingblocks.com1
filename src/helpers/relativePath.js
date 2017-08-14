let path = require('path')
module.exports = function (filePath, srcPath, options) {
    if (/^http/.test(srcPath))
        return srcPath;
    filePath = filePath.split('.tmp')[1];
    return path.relative(filePath + '/..', srcPath);
}
