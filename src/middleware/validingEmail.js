const BAD_REQUEST = 400;

function validingEmail(req, res, next) {
  const { email } = req.body;
  const regex = /\S+@\S+\.\S+/;
  const result = regex.test(email);
  if (!result) {
    next({
      code: BAD_REQUEST,
      errorMessage: { message: 'Invalid entries. Try again.' },
    });
  }
  next();
}

module.exports = validingEmail;
