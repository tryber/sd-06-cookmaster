const jwt = require('jsonwebtoken');
const UserModel = require('../models/UserModel');

const secret = 'secretToken'; // .env

const NOT_FOUND = 404;
const UNAUTHORIZED = 401;

const throwThisError = (code, msg) => {
  const err = new Error(msg);
  err.codeStatus = code;
  throw err;
};

const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) throwThisError(UNAUTHORIZED, 'missing auth token');

  try {
    const decoded = jwt.verify(token, secret);
    const user = await UserModel.findByEmail(decoded.data);
    if (!user) throwThisError(NOT_FOUND, 'Token user not found');
    const { _id, role } = user;
    req.userId = _id;
    req.userRole = (role === 'admin') ? 'admin' : 'user';
  } catch {
    throwThisError(UNAUTHORIZED, 'jwt malformed');
  }
  next();
};

module.exports = { 
  throwThisError,
  verifyToken,
 };