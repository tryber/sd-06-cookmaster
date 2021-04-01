const { verifyEmail } = require('../models/UserModel');

const validateEmail = (email) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};

const validateUser = async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password || !validateEmail(email)) {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }

  if (await verifyEmail(email)) {
    return res.status(409).json({ message: 'Email already registered' });
  }
  
  return next();
}; 

module.exports = { validateUser };