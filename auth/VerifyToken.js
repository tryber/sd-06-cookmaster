const jwt = require('jsonwebtoken');

const secret = 'segredo';

const validateToken = (token) => jwt.decode(token, secret);

module.exports = { validateToken };