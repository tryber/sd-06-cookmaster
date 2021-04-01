const jwt = require('jsonwebtoken');

const secret = 'segredo';

const validateToken = (token) => jwt.verify(token, secret);

module.exports = { validateToken };