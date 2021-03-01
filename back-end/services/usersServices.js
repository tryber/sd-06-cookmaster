const { response } = require('express');
const usersModel = require('../models/usersModels');

const registerUser = async (_req, _res) => {
  const responsePayload = await usersModel.registerUser();
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

module.exports = { registerUser, userLogin, registerAdmin };
