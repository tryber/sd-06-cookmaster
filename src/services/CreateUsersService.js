const Users = require('../models/Users');

const SUCESS = 201;

const createUsers = async (name, email, password) => {
const usersId = await Users.createUsers(name, email, password);

  return {
    status: SUCESS,
    mensage: {
      user: {
        name,
        email,
        role: 'user',
        _id: usersId,
      },
    },
  };
};

module.exports = createUsers;
