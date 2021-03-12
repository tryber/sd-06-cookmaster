const EmailPassCheck = (req, res, next) => {
  const UNAUTHORIZED = 401;
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(UNAUTHORIZED).json({ message: 'All fields must be filled' });
  }
  next();
};

module.exports = EmailPassCheck;