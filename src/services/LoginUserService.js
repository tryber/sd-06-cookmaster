// const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authConfig = require('../config/auth.json');

const { loginUserDb } = require('../models/UserModel');

function generateToken(params = {}) {
  return jwt.sign(params, authConfig.secret, {
    expiresIn: 86400,
  });
}

const LoginUserService = async ({ email }) => {
    const loginUser = await loginUserDb(email);

    if (loginUser) {
      return { 
        loginUser,
        token: generateToken({ id: loginUser.id }), 
      };
    }
};

module.exports = LoginUserService;