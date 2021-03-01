const jwt = require('jsonwebtoken');

const { getByEmail } = require('../models/usersModel');

const SECRET = 'secret';

const ERR = 401;

const MESSAGE = 'jwt malformed';

const verifyToken = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const decoded = jwt.verify(authorization, SECRET);
    const user = await getByEmail(decoded.data.email);
    console.log(user);
    if (!user) return res.status(ERR).json({ message: MESSAGE });

    req.user = decoded.data;
  } catch (err) {
    return res.status(ERR).json({ message: MESSAGE });
  }

  next();
};
module.exports = { verifyToken };
