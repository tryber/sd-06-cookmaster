const { isValidEmail, isFieldInexistent, isLongEnough } = require('./utils/validationUtils');
const { ThrowError } = require('../errorHandler/errorHandler');
const { status, errorMessages } = require('../errorHandler/dictionaries');
const userServices = require('../../services/usersServices');
const { validateToken } = require('./utils/tokenGenerator');

const registerUserSwitch = async (name, email, password) => {
  const minPasswordLength = 8;

  if (isFieldInexistent(name) || isFieldInexistent(email) || isFieldInexistent(password)) {
    throw new ThrowError(status.badRequest, errorMessages.invalidEntries);
  }

  if (!isValidEmail(email)) throw new ThrowError(status.badRequest, errorMessages.invalidEntries);

  if (!isLongEnough(password, minPasswordLength)) {
    throw new ThrowError(status.unauthorized, errorMessages.invalidLogin);
  }
  
  const searchedEmail = await userServices.findUserByEmail(email);
  if (searchedEmail) throw new ThrowError(status.conflict, errorMessages.emailIsRegistered);
};

const registerUserValidations = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    await registerUserSwitch(name, email, password);
    
    next();
  } catch (error) {
    next(error);
  }
};

const loginValidationsSwitch = async (email, password) => {
  // const minPasswordLength = 8;
  if (!isValidEmail(email)) {
    throw new ThrowError(status.unauthorized, errorMessages.invalidLogin);
  }
  const registeredUser = await userServices.findUserByEmail(email);
  if (registeredUser && registeredUser.password !== password) {
    throw new ThrowError(status.unauthorized, errorMessages.invalidLogin);
  }
};

const loginValidations = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    if (isFieldInexistent(email) || isFieldInexistent(password)) {
      throw new ThrowError(status.unauthorized, errorMessages.unfilledFields);
    }
    await loginValidationsSwitch(email, password);

    next();
  } catch (error) {
    next(error);
  }
};

const checkRegisterRecipeBody = (name, ingredients, preparation) => (
  isFieldInexistent(ingredients) 
  || isFieldInexistent(preparation)
  || isFieldInexistent(name)
);

const registerRecipeValidator = async (req, res, next) => {
const { name, ingredients, preparation } = req.body;
const token = req.headers.authorization;

try {
  if (checkRegisterRecipeBody(name, ingredients, preparation)) {
    throw new ThrowError(status.badRequest, errorMessages.invalidEntries);
  }

  const user = await validateToken(token);
  if (!user) throw new ThrowError(status.unauthorized, errorMessages.invalidToken);
  req.user = user;
  next();
} catch (error) {
  next(error);
}
};

const generalTokenValidation = async (token) => {
  if (!token) throw new ThrowError(status.unauthorized, errorMessages.missingAuth);
  const user = await validateToken(token);
  if (!user) throw new ThrowError(status.unauthorized, errorMessages.invalidToken);

  return user;
};

const tokenValidator = async (req, res, next) => {
  const token = req.headers.authorization;

  try {
    const user = await generalTokenValidation(token);
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerUserValidations,
  loginValidations,
  registerRecipeValidator,
  tokenValidator,
};