const jwt = require('jsonwebtoken'); 
const { ThrowError } = require('../../errorHandler/errorHandler');
const { status, errorMessages } = require('../../errorHandler/dictionaries');

const secret = 'm@asT3r_Ch3f';

const headers = {
  algorithm: 'HS256',
  expiresIn: '7d',
};

const createToken = (payload) => {
  const token = jwt.sign(payload, secret, headers);
  return token;
};

const validateToken = async (token) => {
  try {
    return jwt.verify(token, secret);
  } catch (_error) {
    throw new ThrowError(status.unauthorized, errorMessages.invalidToken);
  }
};
  
module.exports = {
  createToken,
  validateToken,
};
