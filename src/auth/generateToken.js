const jwt = require('jsonwebtoken');
const { getUserByEmail } = require('../models/usersModel');

const SUCCESS = 200;

const generateToken = async (req, res, next) => {
  const { email } = req.body;
  const foundUser = await getUserByEmail(email);
  const { _id: id, email: userEmail, role } = foundUser;
  const secret = 'segredo-secreto';

  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };

  const token = jwt.sign({ user: { id, userEmail, role } }, secret, jwtConfig);

  if (foundUser) {
    return res.status(SUCCESS).json({ token });
  }
  
  next();
};
module.exports = generateToken;
