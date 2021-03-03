const User = require('../models/User');

const CONFLICT = 409;

async function checkEmailRepetition(request, response, next) {
  const { email } = request.body;
  const retrievedByEmail = await User.findByEmail(email);
  if (retrievedByEmail) {
    next(
      {
        code: CONFLICT,
        errorMessage: { message: 'Email already registered' },
      },
    );
  }
  next();
}

module.exports = checkEmailRepetition;
