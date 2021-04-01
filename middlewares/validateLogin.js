const { verifyEmail } = require('../models/LoginModel');

const validateEmail = (email) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};

const validateLogin = async (req, res, next) => {
  const { email, password } = req.body;

  const userInfos = await verifyEmail(email);

  if (!email || !password) {
    return res.status(401).json({ message: 'All fields must be filled' });
  }

  if (userInfos.password !== password || !validateEmail(email) || !userInfos) {
    return res.status(401).json({ message: 'Incorrect username or password' });
  }
  
  return next();
}; 

module.exports = { validateLogin };