const UNAUTHORIZED = 401;
const BAD_MESSAGE = 'All fields must be filled';

function validateEmail(req, res, next) {
  const { email } = req.body;
  if (!email) {
    return res.status(UNAUTHORIZED).json({ message: BAD_MESSAGE });
  }
  next();
}

function validatePassword(req, res, next) {
  const { password } = req.body;
  if (!password) {
    return res.status(UNAUTHORIZED).json({ message: BAD_MESSAGE });
  }
  next();
}

module.exports = {
  validateEmail,
  validatePassword,
};