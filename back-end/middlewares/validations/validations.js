const { isValidEmail, isFieldInexistent } = require('./utils/validationUtils');
const { ThrowError } = require('../errorHandler/errorHandler');
const { status, errorMessages } = require('../errorHandler/dictionaries');
const userServices = require('../../services/usersServices');

const registerUserValidations = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    if (isFieldInexistent(name) || isFieldInexistent(email) || isFieldInexistent(password)) {
      throw new ThrowError(status.badRequest, errorMessages.invalidEntries);
    }
  
    if (!isValidEmail(email)) throw new ThrowError(status.badRequest, errorMessages.invalidEntries);

    const searchedEmail = await userServices.findUserByEmail(email);
    if (searchedEmail) throw new ThrowError(status.conflict, errorMessages.emailIsRegistered);
    
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerUserValidations,
};