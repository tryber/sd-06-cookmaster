const Model = require('../models/loginModel');

const login = async (email, password) => {
  // const emailMask = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
  const emailMask = /^[\w-.]+@([a-z]+\.)+[\w-]{2,4}$/g;
  
  if (!email || !password) throw Error('All fields must be filled');
  if (emailMask.test(email) === false) throw Error('Incorrect username or password');
  if (password.length < 7) throw Error('Incorrect username or password');
  const { _id, role } = await Model.validateUser(email, password);
  // if (!user) throw Error('Usuário não encontrado');
  return { _id, email, role };
};

module.exports = {
  login,
};
