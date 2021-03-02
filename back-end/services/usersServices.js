const usersModel = require('../models/usersModels');

const registerUser = async (reqPayload) => {
  const { name, email, password } = reqPayload;
  const role = 'user';
  const { insertedId } = await usersModel.registerUser(name, email, password, role);
  const responsePayload = {
    user: {
    ...reqPayload,
    role,
    _id: insertedId,
    },
  };
  return responsePayload;
};

const findUserByEmail = async (email) => {
  const responsePayload = usersModel.findUserByEmail(email);
  return responsePayload;
};

const registerAdmin = async (_req, _res) => {
  const responsePayload = await usersModel.registerAdmin();
  return responsePayload;
};

const userLogin = async (_req, _res) => {
  const responsePayload = await usersModel.userLogin();
  return responsePayload;
};

module.exports = { registerUser, userLogin, registerAdmin, findUserByEmail };
