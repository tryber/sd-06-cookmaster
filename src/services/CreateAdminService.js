const Users = require('../models/Users');

const SUCESS = 201;

const createAdmin = async (name, email, password) => {
const usersId = await Users.createAdmin(name, email, password);

  return {
    status: SUCESS,
    mensage: {
      user: {
        name,
        email,
        role: 'admin',
        _id: usersId,
      },
    },
  };
};

module.exports = createAdmin;