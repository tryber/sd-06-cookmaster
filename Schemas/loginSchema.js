const blank = (value) => (!value);

const invalidEmail = (email) => {
  const dataPattern = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

  return !dataPattern.test(email);
};

const invalidPassword = (value) => typeof value !== 'string'; 

const errorCode = 401;
const blankMessage = 'All fields must be filled';
const invalidMessage = 'Incorrect username or password';

const validateLoginFields = (email, password) => {
  switch (true) {
    case blank(email):
    case blank(password): return { code: errorCode, message: blankMessage };
    case invalidEmail(email):
    case invalidPassword(password): return { code: errorCode, message: invalidMessage };
    default: return {};
  }
};

module.exports = {
  validateLoginFields,
};
