const UNAUTHORIZED = 401;
const EIGTH = 8;

const validateLogin = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(UNAUTHORIZED).json({ message: 'All fields must be filled' });
  }

  const regex = /[\w]{3,30}@[a-zA-Z]{3,8}.[\w]{2,7}/mg;

  if (!regex.test(email) || (password !== 'admin' && password.length < EIGTH)) {
    return res.status(UNAUTHORIZED).json({ message: 'Incorrect username or password' });
  }

  next();
};

module.exports = {
  validateLogin,
};