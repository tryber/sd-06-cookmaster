const jwt = require('jsonwebtoken');
const Users = require('../models/Users');

const OK = 200;

module.exports = async (request, response, next) => {
  const emailFromBody = request.body.email;
  
  const user = await Users.findByEmail(emailFromBody);
  const { _id, email, role } = user;
  const secret = 'secretToken';
  
  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };

  const token = jwt.sign({ user: { _id, email, role } }, secret, jwtConfig);
  
  if (user) {
    return response.status(OK).json({ token });
  }

  next();
};
