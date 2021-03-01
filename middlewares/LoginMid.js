const min = 8;
const regexEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/;
const UNAUTHORIZED = 401;

const validateLogin = (req, res, next) => {
  const { email, password } = req.body;
  const loginPassowrd = password.toString();
  if (!email || !password) {
    return res.status(UNAUTHORIZED)
      .json({ message: 'All fields must be filled' });
  }
  if (!regexEmail.test(email) || loginPassowrd.length < min) {
    return res.status(UNAUTHORIZED)
  .json({ message: 'Incorrect username or password' });
  }
  next();
};

module.exports = validateLogin;
