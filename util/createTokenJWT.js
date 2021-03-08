const jwt = require('jsonwebtoken');

const pinSecret = 'server';

module.exports = (user) => {
    const headers = {
        algorithm: 'HS256',
    };
    console.log({ user });
    const token = jwt.sign(user, pinSecret, headers);
    console.log({ token });
    console.log(jwt.verify(token, pinSecret));
    return {
        token, pinSecret,
    };
};