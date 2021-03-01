const userModels = require('../Models/usersModel');
const validEmail = require('./validEmail');

const errInvalidEntries = { message: 'Invalid entries. Try again.' };
const errEmail = { message: 'Email already registered' };
const errStatus = 400;
const errEmailStatus = 409;
/* const createStatus = 201; */

const createValidations = async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name) {
    return res.status(errStatus).json(errInvalidEntries);
  }
  if (!password) {
    return res.status(errStatus).json(errInvalidEntries);
  }
  const getEmail = await userModels.getByEmail(email);
  if (validEmail(email) === false) {
    return res.status(errStatus).json(errInvalidEntries);
  }
  if (!email) {
    return res.status(errStatus).json(errInvalidEntries);
  }
  if (getEmail) {
    return res.status(errEmailStatus).json(errEmail);
  }
  next();
};

module.exports = {
  createValidations,
};
