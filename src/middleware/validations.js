const jwt = require('jsonwebtoken');
const UserModel = require('../model/UserModel');
const {
  EMAIL_ALREADY_REGISTERED,
  FIELDS_MUST_BE_FILLED,
  INVALID_ENTRIES,
  JWT_MALFORMED,
  MISSING_TOKEN,
  USER_NOT_FOUND,
} = require('../dictionary/errorMessages');
const {
  BAD_REQUEST,
  CONFLICT,
  UNAUTHORIZED,
} = require('../dictionary/statusCodes');
const { SECRET } = require('../dictionary/constants');
const { findByEmail } = require('../service/UserService');

const validateEmailForm = async (request, response, next) => {
  const user = request.body;
  const { email } = user;
  const emailValidator = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  if (!emailValidator.test(String(email).toLowerCase())) {
    return response
      .status(BAD_REQUEST)
      .send({ message: INVALID_ENTRIES });
  }

  next();
};

const validateEmailUniqueness = async (request, response, next) => {
  const user = request.body;
  const { email } = user;
  const allEmails = await UserModel.findAllEmails();
  const queriedEmail = allEmails.find((queriedObject) => queriedObject.email === email);
  const emailIsNotUnique = typeof queriedEmail === 'object';

  if (emailIsNotUnique) {
    return response.status(CONFLICT).send({
      message: EMAIL_ALREADY_REGISTERED,
    });
  }

  next();
};

const validateMandatoryFields = async (request, response, next) => {
  const user = request.body;
  const nameEmailOrPasswordIsMissing = !user.name || !user.email || !user.password;

  if (nameEmailOrPasswordIsMissing) {
    return response
      .status(BAD_REQUEST)
      .json({ message: INVALID_ENTRIES });
  }

  next();
};

const validateRecipeMandatoryFields = async (request, response, next) => {
  const recipe = request.body;
  const nameIngredientsOrPreparationMissing = !recipe.name
    || !recipe.ingredients
    || !recipe.preparation;

  if (nameIngredientsOrPreparationMissing) {
    return response
      .status(BAD_REQUEST)
      .json({ message: INVALID_ENTRIES });
  }

  next();
};

const validateEmailAndPassword = async (request, response, next) => {
  const user = request.body;
  const emailOrPasswordIsMissing = !user.email || !user.password;

  if (emailOrPasswordIsMissing) {
    return response
      .status(UNAUTHORIZED)
      .json({ message: FIELDS_MUST_BE_FILLED });
  }

  if (!user.email || !user.password) {
    return response
      .status(BAD_REQUEST)
      .json({ message: INVALID_ENTRIES });
  }

  next();
};

const validateToken = async (request, response, next) => {
  try {
    const token = request.headers.authorization;
    if (!token) {
      return response.status(UNAUTHORIZED).send({ message: MISSING_TOKEN });
    }
    
    const { email } = jwt.verify(token, SECRET);
    const user = await findByEmail(email);

    if (!user) { 
      return response
        .status(UNAUTHORIZED).send({ message: USER_NOT_FOUND });
    }

    next();
  } catch (error) {
    return response.status(UNAUTHORIZED).send({ message: JWT_MALFORMED });
  }
};

module.exports = {
  validateToken,
  validateEmailForm,
  validateEmailUniqueness,
  validateEmailAndPassword,
  validateMandatoryFields,
  validateRecipeMandatoryFields,
};
