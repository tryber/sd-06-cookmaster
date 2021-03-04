const handleErrorMessage = require('./handleErrorMessage');

const STATUS = {
  badRequest: 400,
  conflict: 409,
  created: 201,
  notFound: 404,
  ok: 200,
  unpEntity: 422,
  unauthorized: 401,
  forbidden: 403,
};

const dictionary = {
  error: {
    emailIsTaken: handleErrorMessage('Email already registered', STATUS.conflict),
    invalidEntries: handleErrorMessage('Invalid entries. Try again.'),
    allFieldsRequired: handleErrorMessage('All fields must be filled', STATUS.unauthorized),
    invalidCredentials: handleErrorMessage('Incorrect username or password', STATUS.unauthorized),
    noAuthToken: handleErrorMessage('missing auth token', STATUS.unauthorized),
    recipeNotFound: handleErrorMessage('recipe not found', STATUS.notFound),
    notAuthorized: handleErrorMessage('Not authorized to edit this recipe', STATUS.unauthorized),
    failedCreateAdmin: handleErrorMessage('Only admins can register new admins', STATUS.forbidden),
  },
  validations: {
   
  },
  magicNumbers: {
    zero: 0,
  },
};

module.exports = {
  STATUS,
  dictionary,
};
