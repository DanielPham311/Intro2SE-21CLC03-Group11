const crypto = require('crypto');
const hash = crypto.createHash('sha256');

const input = 'whatasdas';
hash.update(input);

const digest = hash.digest('hex');
console.log(digest);

function hashPassword(passwordString)
{
    hash.update(passwordString);
    return hash.digest('hex');
}

exports.hashPassword = hashPassword;