const { validateEmail } = require('./validateEmail');

const BAD_REQUEST = 400;

const validateUser = async (request, response, next) => {
  const { name, email, password } = request.body;

  if (!name || !email || !password || !validateEmail(email)) {
    return response.status(BAD_REQUEST).json({ message: 'Invalid entries. Try again.' });
  }

  next();
};

module.exports = { validateUser };
