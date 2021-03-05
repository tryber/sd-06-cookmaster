const getConnection = require('./connection');

const createLogin = async (email, password) => {
  const loginRegister = await getConnection('users').then((db) => db.findOne({ email, password }));
  console.log(loginRegister, 'User');
  return { user: loginRegister };
};
module.exports = { createLogin };
