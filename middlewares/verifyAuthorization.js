const validateToken = require('../auth/validateToken');
const returnedStatusAndMessage = require('../util/validations');

const status401 = 401;
const status403 = 403;

const verifyAuthorizationLogar = (request, response, next) => {
  const { authorization: token } = request.headers;

  const payload = validateToken(token);
  
  if (!payload) {
    return returnedStatusAndMessage(response,
    status401,
    'jwt malformed');
  }

  request.user = payload;
  next();
};

const verifyAuthorizationEditar = (request, response, next) => {
  const { authorization: token } = request.headers;

  const payload = validateToken(token);
 
  if (!token) {
    return returnedStatusAndMessage(response,
    status401,
    'missing auth token');
  }

  if (!payload) {
    return returnedStatusAndMessage(response,
    status401,
    'jwt malformed');
  }

  request.user = payload;
  next();
};

const verifyAuthorizationAdmin = (request, response, next) => {
  const { authorization: token } = request.headers;

  const payload = validateToken(token);
 
  if (!token || payload.role !== 'admin') {
    return returnedStatusAndMessage(response,
      status403,
    'Only admins can register new admins');
  }

  request.user = payload;
  next();
};

module.exports = {
  verifyAuthorizationLogar,
  verifyAuthorizationEditar,
  verifyAuthorizationAdmin,
};
