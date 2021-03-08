const { ObjectID } = require('bson');
const jwt = require('jsonwebtoken');
const { statusCode, statusMsgs, jwtSecret } = require('../Dicio');

function fieldExists(request, response, next) {
  const { name, ingredients, preparation } = request.body;
  if (!name || !ingredients || !preparation) {
    return response.status(statusCode.BAD_REQUEST).json(
      { message: statusMsgs.tryAgain },
    );
  }
  next();
}

function validateAuthorization(request, response, next) {
  try {
    const { authorization } = request.headers;
    jwt.verify(authorization, jwtSecret);
    next();
  } catch (_err) {
    return response.status(statusCode.UNAUTHORIZED).send({ message: statusMsgs.invalidToken });
  }
}

function isIdValid(request, response, next) {
  const { id } = request.params;

  if (!ObjectID.isValid(id)) {
    return response.status(statusCode.NOT_FOUND).send({ message: statusMsgs.recipeNotFound });
  }
  next();
}

module.exports = {
  fieldExists,
  validateAuthorization,
  isIdValid,
};
