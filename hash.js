const crypto = require('crypto');

var hmac = crypto.createHmac('sha256', "old ice cream");

var hash = hmac.update('do re me fa')
    .digest('hex');

console.log(`hash = ${hash}, ${hash.length}`)
