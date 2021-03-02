const min = 8;
const UNAUTHORIZED = 401;

const validateLogin = (req, res, next) => {
  const regexEmail = /[\w]{3,30}@[a-zA-Z]{3,8}.[\w]{2,7}/mg;
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(UNAUTHORIZED)
      .json({ message: 'All fields must be filled' });
  }
  if (!regexEmail.test(email) || (password !== 'admin' && password.length < min)) {
    return res.status(UNAUTHORIZED)
  .json({ message: 'Incorrect username or password' });
  }
  next();
};

module.exports = validateLogin;
