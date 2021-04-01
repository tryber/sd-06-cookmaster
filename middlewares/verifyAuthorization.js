const { validateToken } = require('../auth/VerifyToken');
const { unauthorized } = require('../utilities/variables');

const verifyAuthorization = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) return res.status(unauthorized).json({ message: 'missing auth token' });
  try {
    const payload = validateToken(authorization);
    if (!payload) return res.status(unauthorized).json({ message: 'jwt malformed' });
    res.locals.loggedEmail = payload.email;
    next();
  } catch (error) {
    return res.status(unauthorized).json({ message: error.message });
  }
};

module.exports = { verifyAuthorization };