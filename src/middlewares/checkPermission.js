const FORBIDDEN = 403;

module.exports = async (request, response, next) => {
  const { role } = request.user;
  
  if (role !== 'admin') {
    return response.status(FORBIDDEN).json({ message: 'Only admins can register new admins' });
  }

  next();
};