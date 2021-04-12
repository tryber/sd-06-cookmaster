const invalidEntries = {
  message: 'Invalid entries. Try again.',
};

const emailAlreadyExists = {
  message: 'Email already registered',
};

const mustFillAllFields = {
  message: 'All fields must be filled',
};

const wrongNameOrPassword = {
  message: 'Incorrect username or password',
};

const invalidToken = {
  message: 'jwt malformed',
};

const recipeNotFound = {
  message: 'recipe not found',
};

const noToken = {
  message: 'missing auth token',
};

const notYours = {
  message: 'you cannot edit a recipe that was not created by you',
};

module.exports = {
  invalidEntries,
  emailAlreadyExists,
  invalidToken,
  recipeNotFound,
  noToken,
  mustFillAllFields,
  notYours,
  wrongNameOrPassword,
};
