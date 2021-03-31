const jwt = require('jsonwebtoken');

const { findByEmail } = require('../models/queryRecipes');

const secret = 'secret';
const status401 = 401;
const msg = 'jwt malformed';

const tokenValid = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(status401).json({ message: 'missing auth token' });
  }

  jwt.verify(authorization, secret, async (err, decoded) => {
    if (err) return res.status(status401).json({ message: msg });
    const { email } = decoded;
    const emailDb = await findByEmail(email);
    const { _id } = emailDb;
    if (!emailDb) {
      return res.status(status401).json({ message: msg });
    }
    req.userId = _id;
    req.emailReq = email;
    next();
  });
};

module.exports = { tokenValid };
