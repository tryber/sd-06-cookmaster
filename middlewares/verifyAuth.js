const { validateToken: valid } = require('../authentication');
const { dataResponse: data } = require('../utilsData');

const verifyAuthorization = (req, res, next) => {
  const { authorization: token } = req.headers;
  const payload = valid.validateToken(token);  
  if (!payload) return res.status(data.status.unauthorized).json(data.objAnswer.err_token);
  next();
};

module.exports = verifyAuthorization;
