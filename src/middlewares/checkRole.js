const FORBIDDEN = 403;

async function checkRole(req, res, next) {
  const { role } = req.user;
  
  if (role !== 'admin') {
    return res.status(FORBIDDEN).json({ message: 'Only admins can register new admins' });
  }

  next();
}

module.exports = checkRole;
