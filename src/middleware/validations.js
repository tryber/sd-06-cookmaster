const UserModel = require('../model/UserModel');
const errorMessages = require('../dictionary/errorMessages');
const statusCodes = require('../dictionary/statusCodes');

const validateEmailForm = async (request, response, next) => {
  const user = request.body;
  const { email } = user;
  const emailValidator = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  if (!emailValidator.test(String(email).toLowerCase())) {
    return response
      .status(statusCodes.BAD_REQUEST)
      .send({ message: errorMessages.INVALID_ENTRIES });
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
    return response.status(statusCodes.CONFLICT).send({
      message: errorMessages.EMAIL_ALREADY_REGISTERED,
    });
  }

  next();
};

const validateMandatoryFields = async (request, response, next) => {
  const user = request.body;
  const nameEmailOrPasswordIsMissing = !user.name || !user.email || !user.password;

  if (nameEmailOrPasswordIsMissing) {
    return response
      .status(statusCodes.BAD_REQUEST)
      .json({ message: errorMessages.INVALID_ENTRIES });
  }

  next();
};

const validateEmailAndPassword = async (request, response, next) => {
  const user = request.body;
  const emailOrPasswordIsMissing = !user.email || !user.password;

  if (emailOrPasswordIsMissing) {
    return response
      .status(statusCodes.UNAUTHORIZED)
      .json({ message: errorMessages.FIELDS_MUST_BE_FILLED });
  }

  if (!user.email || !user.password) {
    return response
      .status(statusCodes.BAD_REQUEST)
      .json({ message: errorMessages.INVALID_ENTRIES });
  }

  next();
};

module.exports = {
  validateEmailForm,
  validateEmailUniqueness,
  validateEmailAndPassword,
  validateMandatoryFields,
};
