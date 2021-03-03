const handleErrorMessage = require('./handleErrorMessage');

const STATUS = {
  badRequest: 400,
  conflict: 409,
  created: 201,
  notFound: 404,
  ok: 200,
  unpEntity: 422,
  unauthorized: 401,
};

const dictionary = {
  error: {
    emailIsTaken: handleErrorMessage('Email already registered', STATUS.conflict),
    invalidEntries: handleErrorMessage('Invalid entries. Try again.'),
    allFieldsRequired: handleErrorMessage('All fields must be filled', STATUS.unauthorized),
    invalidCredentials: handleErrorMessage('Incorrect username or password', STATUS.unauthorized),
    noAuthToken: handleErrorMessage('Missing authentication token.', STATUS.unauthorized),
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
