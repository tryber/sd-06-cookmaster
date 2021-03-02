const handleErrorMessage = require('./handleErrorMessage');

const STATUS = {
  badRequest: 400,
  conflict: 409,
  created: 201,
  notFound: 404,
  ok: 200,
  unpEntity: 422,
};

const dictionary = {
  error: {
    emailIsTaken: handleErrorMessage('Email already registered', STATUS.conflict),
    invalidEntries: handleErrorMessage('Invalid entries. Try again.'),
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
