const jwt = require('jsonwebtoken');
const { findUser } = require('../models/userModel');
const { secret } = require('../controller/loginController');

const validateToken = async (req, res, next) => {
  try {
    const decoded = jwt.verify(req.headers.authorization, secret);
    const user = await findUser(decoded.data.email);

    if (!user) {
      return res.status(401).json({ message: 'jwt malformed' });
    }

    req.user = decoded.data;
  } catch (err) {
    return res.status(401).json({ message: 'jwt malformed' });
  }

  next();
};

module.exports = validateToken;
