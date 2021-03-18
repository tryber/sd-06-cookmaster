const { findByEmail } = require('../models/userModel');

const error = 409;

const checkEmail = async (req, res, next) => {
  const { email } = req.body;
  console.log(`recebi no checkEmail ${email}`);
  const result = await findByEmail(email);
  if (result) {
    next(
      {
        code: error,
        errorMessage: { message: 'Email already registered' },
      },
    );
  }
  next();
};

module.exports = checkEmail;
