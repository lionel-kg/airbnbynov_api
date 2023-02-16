const jwt    = require('jsonwebtoken');

exports.signToken = (payload, secret) => 
{
    return jwt.sign(payload, secret)
}

