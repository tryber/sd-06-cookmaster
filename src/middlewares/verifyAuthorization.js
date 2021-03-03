const { validateToken } = require('../auth/validateToken');

const verifyAuthorization = async (req, res, next) => {
  // aqui estou chamando authorization do headers de token
  const { authorization: token } = req.headers;
  // console.log(authorization);
  const payload = await validateToken(token);

  if (!payload) {
    return res.status(401).json({ message: 'jwt malformed' });
  }
  // console.log(payload);
  // const { _id } = payload;
  // console.log(_id);
  next();
};

module.exports = verifyAuthorization;
