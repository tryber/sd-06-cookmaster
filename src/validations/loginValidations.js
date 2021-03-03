const { findByEmailAndPassword } = require('../models/mongoDbRequests');

const connectionUsers = 'users';
const typeError = 401;

const {
  objError,
  isBlank,
} = require('./usefulFuncsValidations');

const validationLoginKeysExists = (body) => {
  const { email, password } = body;

  switch (true) {
    case isBlank(email):
    case isBlank(password):
      return objError('All fields must be filled', typeError);
    default: return null;
  }  
};

const validationLoginUserExists = async (body, res) => {
  const { email, password } = body;
  
  try {
    const user = await findByEmailAndPassword(connectionUsers, email, password);
    if (!user) {
      return objError('Incorrect username or password', typeError);
    }
    res.locals.user = user;
  } catch {
    return objError('erro interno', 500);
  }  
  return null;
};

module.exports = {
  validationLoginKeysExists,
  validationLoginUserExists,
};
