module.exports = {
  invalidEntry: {
    code: 'invalid_data',
    message: 'Invalid entries. Try again.',
  },
  emailAlreadyInUse: {
    code: 'data_conflict',
    message: 'Email already registered',
  },
  invalidLoginField: {
    code: 'invalid_credentials',
    message: 'All fields must be filled',
  },
  invalidEmailOrPassword: {
    code: 'invalid_credentials',
    message: 'Incorrect username or password',
  },
  recipeNotFound: {
    code: 'not_found',
    message: 'recipe not found',
  },
  invalidToken: {
    code: 'invalid_credentials',
    message: 'jwt malformed',
  },
  missingToken: {
    code: 'invalid_credentials',
    message: 'missing auth token',
  },
};
