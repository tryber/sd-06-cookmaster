const jwt = require('jsonwebtoken');

const segredo = 'trybeehtop';

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'jwt malformed' });
  }
  try {
    const decoded = jwt.verify(token, segredo);
    const { _id: id } = decoded.data;
    req.userId = id;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'jwt malformed' });
  }
};
