const statusMsgs = {
  tryAgain: 'Invalid entries. Try again.',
  alreadyRegist: 'Email already registered',
  emptyFields: 'All fields must be filled',
  loginError: 'Incorrect username or password',
};

const statusCode = {
 SUCCESS_CREATED: 201,
 UNAUTHORIZED: 401,
 BAD_REQUEST: 400,
 CONFLICT: 409,
 SUCCESS: 200,
};

module.exports = {
  statusMsgs,
  statusCode,
};