const { response } = require('express');
const jwt = require('jsonwebtoken');

const secret = 'segredo-secreto';

const UNAUTHORIZED = 401;

const validateToken = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return response.status(UNAUTHORIZED).json({ message: 'missing auth token' });
  }

  try {
    const decodeToken = jwt.verify(authorization, secret);
  } catch (error) {
    console.log(error);
  }
  
  next();
};
// const newToken = async (data) => {
//   const token = jwt.sign({ data }, secret, jwtConfig);
//   return token;
// };

module.exports = validateToken;
