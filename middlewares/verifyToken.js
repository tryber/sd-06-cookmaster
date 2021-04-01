const jwt = require('jsonwebtoken');

const { getByEmail } = require('../models/usersModel');

const secret = 'secret';

const ERR = 401;

const MESSAGE = 'jwt malformed';

const verifyToken = async (req, res, next) => {
  const { authorization } = req.headers;
  try {
    if (!authorization) return res.status(ERR).json({ message: 'missing auth token' });
    const decoded = jwt.verify(authorization, secret);
    const user = await getByEmail(decoded.data.email);
  
    if (!user) return res.status(ERR).json({ message: MESSAGE });
  
    req.user = decoded.data;
  } catch (err) {
    return res.status(ERR).json({ message: MESSAGE });
  }

  next();
};

module.exports = { verifyToken };
