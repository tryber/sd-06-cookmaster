const OK = 200;
const CREATED = 201;
const NOT_FOUND = { code: 404, message: 'recipe not found' };
const BAD_REQUEST = { code: 400, message: 'Invalid entries. Try again.' };
const CONFLICT = { code: 409, message: 'Email already registered' };
const UNAUTHORIZED = {
  code: 401,
  message: {
    requiredField: 'All fields must be filled',
    incorrectField: 'Incorrect username or password',
  },
};

module.exports = {
  OK,
  CREATED,
  BAD_REQUEST,
  CONFLICT,
  UNAUTHORIZED,
  NOT_FOUND,
};
