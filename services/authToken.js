const jwt = require('jsonwebtoken');

const secret = 'secret';
const status401 = 401;
const msg = 'jwt malformed';

const tokenValid = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(status401).json({ message: msg });
  }
  // const info = jwt.verify(authorization, secret);
  // console.log(info);

  jwt.verify(authorization, secret, (err, decoded) => {
    if (err) return res.status(status401).json({ message: msg });
    req.params.userId = decoded.id;
    next();
  });
};

module.exports = { tokenValid };
