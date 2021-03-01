const UsersService = require('../service/UsersService');

const SUCCESS_201 = 201;

const createUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  const result = await UsersService.createUser(name, email, password);
  
  if (result.payload) return next(result);
  return res.status(SUCCESS_201).json(result);
};

module.exports = {
  createUser,
};
