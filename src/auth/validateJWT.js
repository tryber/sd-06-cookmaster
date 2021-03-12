const jwt = require('jsonwebtoken');

const UNAUTHORIZED = 401;
const secret = 'secretToken';

module.exports = async (request, response, next) => {
  const token = request.headers.authorization;
  
  if (!token) {
    return response.status(UNAUTHORIZED).json({ message: 'missing auth token' });
  }

  try {
    const decoded = jwt.verify(token, secret);
    request.user = decoded.user;
  } catch (err) {
    return response.status(UNAUTHORIZED).json({ message: 'jwt malformed' });
  }

  next();
};