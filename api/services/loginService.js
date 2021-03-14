const Model = require('../models/loginModel');

const login = async (email, password) => {
  const emailMask = /^[a-z0-9.]+@[a-z]+\.[a-z]+(\.[a-z]+)?$/i;
  
  if (!email || !password) throw Error('All fields must be filled');
  if (emailMask.test(email) === false) throw Error('Incorrect username or password');
  if (password.length < 7
    && email !== 'root@email.com') throw Error('Incorrect username or password');
  const { _id, role } = await Model.validateUser(email, password);
  
  return { _id, email, role };
};

module.exports = {
  login,
};
