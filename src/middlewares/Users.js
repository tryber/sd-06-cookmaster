const { validateUser } = require('../schemas/Users');
const Users = require('../services/Users');

const createUser = async (req, res) => {
  const { name, email, password } = req.body;

  const user = await Users.createUser(name, email, password);
  
  res.status(201).json(user);
};

const userValidation = async (req, res, next) => {
  const { name, email, password } = req.body;

  const validations = await validateUser(name, email, password);

  if (validations.message) {
    return next({
        statusCode: validations.code,
        customMessage: validations.message,
    }); 
  }

  next();
};

module.exports = {
  createUser,
  userValidation,
};