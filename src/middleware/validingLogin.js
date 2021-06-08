const UNAUTHORIZED = 401;

function checkLoginFields(req, res, next) {
  const { email, password } = req.body;
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
