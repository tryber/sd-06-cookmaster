const users = require('../models/users');

const getAllUsers = async () => {
  return await users.getAll();
};

const loginUser = async (name, email, password) => {
  const emailValidation = /^[a-z0-9.]+@[a-z0-9]+\.com?$/i;
  const emailExist = await users.findByEmail(email);

  if(!name || !email || !password) {
    throw {
      message: 'Invalid entries. Try again.'
    }
  }

  if(!emailValidation.test(email)) {
    throw {
      message: 'Invalid entries. Try again.'
    }
  }

  if(emailExist) {
    throw {
      code: 'Conflict',
      err: {
        message: 'Email already registered'
      }
    }
  }

  return await users.login(name, email, password);
};

module.exports = {
  getAllUsers,
  loginUser,
};
