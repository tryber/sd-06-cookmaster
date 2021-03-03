const jwt = require('jsonwebtoken');
const UserService = require('../service/UserService');

const secret = 'mySecretToken';

const erros = {
  invalid_token: { code: 401, message: 'jwt malformed' },
};

const isBlank = (field) => !field || field === '';

const validateToken = async (token) => {
  try {
    // if (isBlank(token)) { return erros.invalid_token; }
    const decoded = jwt.verify(token, secret);
    const user = await UserService.findByEmail(decoded.data.email);
   
    if (isBlank(user)) { return erros.invalid_token; }
    return { user };    
  } catch (error) {
    return erros.invalid_token;
  }
};

module.exports = {
  validateToken,
};
