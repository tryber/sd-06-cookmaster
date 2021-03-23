const jwt = require('jsonwebtoken');
const { findByEmail } = require('./queryLogin');

const status401 = 401;

const SECRET = 'senhaSuperSecreta.com';

const verifyLogin = async (req, res, next) => {
  const { authorization } = req.headers;
  
  if (!authorization) {
    return res.status(status401).json({
      message: 'Incorrect username or password',
    });
  }

  jwt.verify(authorization, SECRET, async (err, decoded) => {
    if (err) return res.status(status401).json({ message: 'failed to auth token' });
    const { email } = decoded.data[0];
    const login = await findByEmail(email);
    if (!login) return res.status(status401).json({ message: 'user not registered' });
  });

  next();
};

module.exports = {
  SECRET,
  verifyLogin,
};
