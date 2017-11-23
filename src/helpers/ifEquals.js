module.exports = function (str1, str2, options) {
    if (!str1 || !str2)
        return;
    if (str1.toString().toLowerCase() === str2.toString().toLowerCase())
        return options.fn(this);
}
