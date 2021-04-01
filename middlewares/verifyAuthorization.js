const { ObjectId } = require('mongodb');
const validateToken = require('../services/auth/validateToken');

const code = 401;

async function AuthorizationLoginRecipes(request, response, next) {
  const { authorization: token } = request.headers;

  if (!token) return response.status(code).json({ message: 'missing auth token' });
  const payload = await validateToken(token);

  if (!payload) return response.status(code).json({ message: 'jwt malformed' });
  next();
}

function validateId(request, response, next) {
  const { id } = request.params;
  if (!ObjectId.isValid(id)) {
 return response
      .status(404)
      .json({ message: 'recipe not found' }); 
}
  next();
}

module.exports = {
  AuthorizationLoginRecipes,
  validateId,
};
