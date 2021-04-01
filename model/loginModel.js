const getConnection = require('./connection');

const createLogin = async (email, password) => {
  const loginRegister = await getConnection('users').then((db) => db.findOne({ email, password }));
 
  return { user: loginRegister };
};
module.exports = { createLogin };
