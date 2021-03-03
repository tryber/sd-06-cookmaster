const jwt = require('jsonwebtoken');

const tokenMiddleware = async (req, res, next) => {
  try {
    const secretPassword = 'Root2021';
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({
        message: 'missing auth token',
      });
    }
    const payload = jwt.verify(token, secretPassword);
    req.payload = payload;
    next();
  } catch (err) {
    res.status(401).json({ message: 'jwt malformed' });
  }
};

module.exports = tokenMiddleware;
