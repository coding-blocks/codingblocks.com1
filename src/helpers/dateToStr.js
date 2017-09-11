var moment = require('moment');
module.exports = function (date, options) {
    var dateObj = new Date(date);
    return moment(dateObj).format('MMMM DD');
};
