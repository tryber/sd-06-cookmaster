const jwt = require('jsonwebtoken');
const { findUserByEmail } = require('../models/usersModel');

const createToken = async (request, response, next) => {
  const { email } = request.body;
  const gotUserBy = await findUserByEmail(email);
  const { _id: id, email: emailFromUser, role } = gotUserBy;
  const secret = 'token-secret-created';
  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };
  const token = jwt.sign({ user: { id, emailFromUser, role } }, secret, jwtConfig);

  if (gotUserBy) {
    return response.status(200).json({ token });
  }
  
  next();
};
module.exports = createToken;
