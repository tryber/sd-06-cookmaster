const jwt = require('jsonwebtoken');

const userLogin = async (email, password) => {
  const secret = 'mySecretToken';

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
