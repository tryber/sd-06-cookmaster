const Users = require('../models/Users');
const createToken = require('../auth/createToken');

const SUCESS = 200;

const loginUsers = async (email) => {
  const {
    name: nameDB, password: passwordDB, ...userWithoutPassword 
  } = await Users.findByEmail(email);

  const token = createToken(userWithoutPassword);

  return {
    status: SUCESS,
    token,
  };
};

module.exports = loginUsers;
