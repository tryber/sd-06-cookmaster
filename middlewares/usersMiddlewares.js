const { dataResponse: data, dataResponse } = require('../utilsData');
const { usersValidations: valid, usersServices } = require('../services');
const { validateToken: ValidToken } = require('../authentication');

const create = async (req, res) => {
  const { name, email, password } = req.body;
  const user = {
    email, name, password, role: 'user',
  };
  await usersServices.create(user);
  return res.status(data.status.created).json({ user });
};

const createAdmin = async (req, res) => {
  const { name, email, password } = req.body;
  const user = {
    email, name, password, role: 'admin',
  };
  await usersServices.create(user);
  return res.status(data.status.created).json({ user });
};

const verifyBodyCreate = async (req, res, next) => {
  const { name, email, password } = req.body;
  switch (true) {
    case valid.verifyName(name):
      return res.status(data.status.bad_request).json(data.objAnswer.err_body.err1);
    case valid.verifyEmail(email):
      return res.status(data.status.bad_request).json(data.objAnswer.err_body.err1);
    case await valid.searchUserByEmail(email):
      return res.status(data.status.conflict).json(data.objAnswer.err_body.err2);
    case valid.verifyPassword(password):
      return res.status(data.status.bad_request).json(data.objAnswer.err_body.err1);
    default: console.log({ user: 'Created' });
  }
  next();
};

const verifyIsAdmin = async (req, res, next) => {
  const { authorization: token } = req.headers;
  const { email } = await ValidToken.validateToken(token);
  const user = await usersServices.selectUser(email);
  if (user.role !== 'admin') {
    return res.status(data.status.forbidden).json(dataResponse.objAnswer.err_admin);
  }
  next();
};

module.exports = {
  create,
  verifyBodyCreate,
  createAdmin,
  verifyIsAdmin,
};
