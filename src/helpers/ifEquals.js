module.exports = function (str1, str2, options) {
    if (str1 === str2)
        return options.fn(this);
}
