const { validateEmail } = require('./validateUser');

const validateLogin = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(401).json({ message: 'All fields must be filled' });
  }
  if (!validateEmail(email)) {
    return res.status(401).json({ message: 'Incorrect username or password' });
  }
  next();
};

module.exports = { validateLogin };