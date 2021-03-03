const UNAUTHORIZED = 401;

function checkLoginFields(request, response, next) {
  const { email, password } = request.body;
  if (!email || !password) {
    next(
      {
        code: UNAUTHORIZED,
        errorMessage: { message: 'All fields must be filled' },
      },
    );
  }
  next();
}

module.exports = checkLoginFields;
