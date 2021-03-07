const jwt = require('jsonwebtoken');

const pinSecret = 'server';

module.exports = (user) => {
    const headers = {
        algorithm: 'HS256',
    };

    const token = jwt.sign(user, pinSecret, headers);

    return {
        token, pinSecret,
    };
};