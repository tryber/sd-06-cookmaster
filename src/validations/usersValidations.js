const {
  objError,
} = require('../useful/funcsObjUseful');

const {
  isBlank,
  isValidEmail,
} = require('../useful/funcsBollQuestions');

const { findByEmail } = require('../models/mongoDbRequests');

const connectionUsers = 'users';

const validationUsersEmailConflict = async (body) => {
  const { email } = body;
  const typeError = 409;
  
  try {
    const emailConflict = await findByEmail(connectionUsers, email);
    if (emailConflict) {
      return objError('Email already registered', typeError);
    }
  } catch {
    return objError('erro interno', 500);
  }  
  return null;
};

const validationUsersKeysFormat = (body) => {
  const { name, email, password } = body;
  const typeError = 400;

  switch (true) {
    case isBlank(name):
    case isBlank(email):
    case isBlank(password):
    case isValidEmail(email):
      return objError('Invalid entries. Try again.', typeError);
    default: return null;
  }  
};

module.exports = {
  validationUsersKeysFormat,
  validationUsersEmailConflict,
};
