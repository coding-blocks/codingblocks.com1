let path = require('path')
module.exports = function (filePath, srcPath, options) {
    if (/^http/.test(srcPath))
        return srcPath;
    if (!filePath)
        return srcPath;
    filePath = filePath.split('src')[1];
    return path.relative(filePath + '/..', srcPath);
}
