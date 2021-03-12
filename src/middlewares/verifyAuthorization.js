const { validateToken } = require('../auth/validateToken');

const verifyAuthorization = async (req, res, next) => {
  // aqui estou chamando authorization do headers de token
  const { authorization: token } = req.headers;
  // console.log(authorization);
  const payload = await validateToken(token);

  // console.log(payload);
  // const { role } = payload;
  // console.log(role);
  if (!token) {
    return res.status(401).json({ message: 'missing auth token' });
  }

  if (!payload) {
    return res.status(401).json({ message: 'jwt malformed' });
  }
  
  next();
};

module.exports = verifyAuthorization;
