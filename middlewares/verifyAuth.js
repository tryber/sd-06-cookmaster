const { validateToken: valid } = require('../authentication');
const { dataResponse: data } = require('../utilsData');

const verifyAuthorization = async (req, res, next) => {
  const { authorization: token } = req.headers;
  if (!token) return res.status(data.status.unauthorized).json(data.objAnswer.err_token.err2);

  const payload = await valid.validateToken(token);
  if (!payload) return res.status(data.status.unauthorized).json(data.objAnswer.err_token.err1);
  next();
};

module.exports = verifyAuthorization;
