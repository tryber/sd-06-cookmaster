const Users = require('../models/Users');

const UNAUTH = 401;

const validateLogin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(UNAUTH).json({
    message: 'All fields must be filled',
  });
  }

  const emailResponse = await Users.findByEmail(email);
  if (!emailResponse) {
    return res.status(UNAUTH).json({ message: 'Incorrect username or password' });
  }

  if (emailResponse.password !== password) {
    return res.status(UNAUTH).json({ message: 'Incorrect username or password' });
  }
  next();
};

module.exports = validateLogin;
