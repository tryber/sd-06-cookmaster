// const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authConfig = require('../config/auth.json');

const { loginUserDb, salvedTokenDb } = require('../models/UserModel');

const OK = 200;

function generateToken(params = {}) {
  return jwt.sign(params, authConfig.secret, {
    expiresIn: 86400,
  });
}

const LoginUserService = async ({ email }, res) => {
  const loginUser = await loginUserDb(email);
  
  if (loginUser) {
    const token = generateToken({ id: loginUser.id });

    await salvedTokenDb(loginUser, token);

    return res.status(OK).json({ token });
  }
};

module.exports = LoginUserService;