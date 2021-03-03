const userService = require('../services/userService');

const OK = 200;
const CREATED = 201;

const create = async (request, response, next) => {
  try {
    const { name, email, password } = request.body;
    const role = 'user';
    const user = await userService.create(name, email, password, role);
    return response.status(CREATED).json({ user });
  } catch (err) {
    next(err);
  }
};

const createAdmin = async (request, response, next) => {
  try {
    const { name, email, password } = request.body;
    const { role } = request.user;
    const user = await userService.create(name, email, password, role);
    return response.status(CREATED).json({ user });
  } catch (err) {
    next(err);
  }
};

const getAll = async (request, response, next) => {
  try {
    const users = await userService.getAll();
    return response.status(OK).json({ users });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  create,
  createAdmin,
  getAll,
};