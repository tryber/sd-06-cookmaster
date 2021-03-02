const jwt = require('jsonwebtoken');
const { validateLogin } = require('../schemas/Users');
const Users = require('../services/Users');

const secret = 'seusecretdetoken';

const userLogin = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await Users.findUserByEmail(email);
  const validation = validateLogin(email, password, user);

  if (validation.message) {
    return next({
        statusCode: validation.code,
        customMessage: validation.message,
    }); 
  }

  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };

  const token = jwt.sign({ data: user }, secret, jwtConfig);
  res.status(200).json({ token });
};

module.exports = userLogin;