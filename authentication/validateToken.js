const jwt = require('jsonwebtoken');

const secret = 'project cookmaster';

const validateToken = async (payload) => {
    const token = await jwt.decode(payload, secret);
    return token;
};

module.exports = { validateToken };
