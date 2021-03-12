const jwt = require('jsonwebtoken');

const pinSecret = 'server';

module.exports = (token) => {
    try {
        return jwt.verify(token, pinSecret);
    } catch (e) {
        return null;
    }
};