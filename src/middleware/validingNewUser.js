const BAD_REQUEST = 400;

function checkNewUserFields(request, response, next) {
  const { name, email, password } = request.body;
  if (!name || !email || !password) {
    next(
      {
        code: BAD_REQUEST,
        errorMessage: { message: 'Invalid entries. Try again.' },
      },
    );
  }
  next();
}

module.exports = checkNewUserFields;
