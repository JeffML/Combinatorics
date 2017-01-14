const crypto = require('crypto');
const _ = require('lodash')

function hash(choice) {
    var str = _.chain(choice)
        .flatten()
        .sortBy()
        .join('|')
        .value();

    return crypto.createHmac('sha256', 'old ice cream')
        .update(str)
        .digest('hex');
}

module.exports = hash;
