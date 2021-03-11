const User = require('../models/usersModel');

const checkEmail = async (req, res, next) => {
  const { email } = req.body;
  const equalsEmail = await User.findByEmail(email);
  if (equalsEmail) res.status(409).json({ message: 'Email already registered' });
  next();
};

module.exports = checkEmail;
