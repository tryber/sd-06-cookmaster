const FORBIDDEN = 403;

function validateAdmin(request, response, next) {
  const { role } = request.user;
  if (role !== 'admin') {
    return next(
      {
        code: FORBIDDEN,
        errorMessage: { message: 'Only admins can register new admins' },
      },
    );
  }
  next();
}

module.exports = validateAdmin;
