module.exports = function (obj, arr, options) {
    if (!arr.includes(obj))
        return options.fn(this);
}
