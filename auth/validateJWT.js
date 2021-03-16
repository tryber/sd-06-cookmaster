const jwt = require('jsonwebtoken');
const { findUserByEmail } = require('../models/Users');

const segredo = 'trybeehtop';

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'missing auth token' });
  }
  try {
    const decoded = jwt.verify(token, segredo);
    const user = await findUserByEmail(decoded.data.email);
    if (!user) return res.status(401).json({ message: 'jwt malformed' });
    const { _id: id } = decoded.data;
    req.userId = id;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'jwt malformed' });
  }
};
