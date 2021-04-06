const { decipherToken } = require('../jwt/token');
const { userByEmail } = require('../models/usersModel');

async function tokenValidate(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: 'missing auth token' });
  }
  try {
    const decipher = await decipherToken(authorization);
    const userFound = await userByEmail(decipher.data.email);
    const { _id } = userFound;
    res.locals.userId = _id;
    next();
  } catch (error) {
    res.status(401).json({ message: 'jwt malformed' });
  }
}

module.exports = tokenValidate;
