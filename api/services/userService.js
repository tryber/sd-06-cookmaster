const Model = require('../models/userModel');
const { validate } = require('../schemas/userSchemas');

const createUser = async (name, email, password, role) => {
  const checkEmailExists = await Model.checkEmailExists(email);
  if (checkEmailExists.length > 0) throw Error('Email already registered');
  
  const isValid = validate(name, email, password);
  if (isValid) {
    const user = await Model.createUser(name, email, password, role);
    return user;
  }
};

module.exports = {
  createUser,
};
