module.exports = function (num, div, tag, options) {
    if(tag === 'start'){
        if (Number(num) === 0) {
            return options.fn(this);
        }
        if ((Number(num) + 1 ) < div) {
            return;
        }
        if ((Number(num) + 1 ) % div === 1)
            return options.fn(this);
    }
    else {
        if ((Number(num) + 1 ) < div) {
            return;
        }
        if ((Number(num) + 1) % div === 0)
            return options.fn(this);
    }
};
