const jwt = require('jsonwebtoken');
require('dotenv').config();

const { IS_LOCAL, TOKEN_SECRET } = process.env;
const secret = (IS_LOCAL)
  ? TOKEN_SECRET
  : 'mySecretToken';

const userLogin = async (email, password) => {
  const user = {
    email,
    password,
  };

  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };

  const token = jwt.sign({ data: user }, secret, jwtConfig);

  return token;
};

module.exports = {
  userLogin,
};
