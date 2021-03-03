const BAD_REQUEST = 400;

function validateEmail(request, response, next) {
  const { email } = request.body;
  const regexPattern = /\S+@\S+\.\S+/;
  const isEmailValid = regexPattern.test(email);
  if (!isEmailValid) {
    next(
      {
        code: BAD_REQUEST,
        message: 'Invalid entries. Try again.',
      },
    );
  }

  next();
}

module.exports = validateEmail;
