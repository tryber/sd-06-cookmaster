const User = require('../models/User');

const create = async (name, email, password) => {
  if (!name || !email || !password) return false;
  
  const emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/.test(email);
  if (!emailRegex) return false;
  
  const emails = await User.findAll().then((users) => users.map((user) => user.email));
  if (emails.includes(email)) return { emailAlreadyExists: true };
  
  return User.create(name, email, password);
};

const findAll = async () => User.findAll();

const createAdmin = (name, email, password) => User.createAdmin(name, email, password);

module.exports = {
  create,
  findAll,
  createAdmin,
};
