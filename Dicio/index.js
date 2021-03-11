const statusMsgs = {
  tryAgain: 'Invalid entries. Try again.',
  alreadyRegist: 'Email already registered',
  emptyFields: 'All fields must be filled',
  loginError: 'Incorrect username or password',
  recipeNotFound: 'recipe not found',
  invalidToken: 'jwt malformed',
  authToken: 'missing auth token',
};

const statusCode = {
 SUCCESS_CREATED: 201,
 UNAUTHORIZED: 401,
 BAD_REQUEST: 400,
 NO_CONTENT: 204,
 NOT_FOUND: 404,
 CONFLICT: 409,
 SUCCESS: 200,
};

const jwtSecret = 'ofFrenchCuisineIsButterAndButter';

const jwtHeaders = {
  algorithm: 'HS256',
  expiresIn: '5d',
};

module.exports = {
  statusMsgs,
  statusCode,
  jwtSecret,
  jwtHeaders,
};
