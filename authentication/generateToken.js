const jwt = require('jsonwebtoken');

const secret = 'project cookmaster';

const headers = {
    algorithm: 'HS256',
    expiresIn: '7d',
};

const createToken = async (payload) => {
    const token = await jwt.sign(payload, secret, headers);
    return token;
};

module.exports = { createToken };
