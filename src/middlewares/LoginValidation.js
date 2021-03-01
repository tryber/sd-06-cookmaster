const STATUS_UNAUTHORIZED = 401;
const STATUS_INTERNAL_SERVER_ERROR = 500;

const validateEmail = (email) => {
  const mailRegex = /^\S+@\S+$/;
  return mailRegex.test(email);
};

const LoginValidation = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(STATUS_UNAUTHORIZED).json({ message: 'All fields must be filled' });
    }
    if (!validateEmail(email) || typeof password !== 'string') {
      return res.status(STATUS_UNAUTHORIZED).json({ message: 'Incorrect username or password' });
    }
  } catch (err) {
    return res.status(STATUS_INTERNAL_SERVER_ERROR).json({ err: 'Server Internal Error' });
  }
  next();
};

module.exports = {
  LoginValidation,
};
