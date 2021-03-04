const Model = require('../models/userModel');

const createUser = async (name, email, password) => {
  const role = 'user';
  if (!name || !email || !password) throw Error('Invalid entries. Try again.');

  const emailMask = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
  if (emailMask.test(email) === false) throw new Error('Invalid entries. Try again.');

  const checkEmail = await Model.findByEmail(email);
  if (checkEmail.length > 0) throw Error('Email already registered'); 
  
  const create = await Model.createUser(name, email, password, role);
  return create;
};

module.exports = {
  createUser,
};
