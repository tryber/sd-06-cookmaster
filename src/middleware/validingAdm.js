const error = 403;

function validingAdmin(req, res, next) {
  const { role } = req.user;
  if (role !== 'admin') {
    return next(
      {
        code: error,
        errorMessage: { message: 'Only admins can register new admins' },
      },
    );
  }
  next();
}

module.exports = validingAdmin;
