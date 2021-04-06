const { checkUser } = require('../models/usersModel');
const { newToken } = require('../jwt/token');

const errorMessage = {
  message: 'All fields must be filled',
};

async function loginValidation(req, res, next) {
  const { email, password } = req.body;
  if (Object.entries(req.body).length !== 2) {
    return res.status(401).json(errorMessage);
  }

  const foundUserAccount = await 
    checkUser(email, password);
  if (foundUserAccount === null) {
    return res.status(401).json({ message: 'Incorrect username or password' });
  }
  const token = await 
    newToken({ email, password });
    res.status(200).json({ token });
  return next();
}

module.exports = loginValidation;
