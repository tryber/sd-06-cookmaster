const jwt = require('jsonwebtoken');

const secret = 'project cookmaster';

const validateToken = (token) => jwt.decode(token, secret);

module.exports = { validateToken };
