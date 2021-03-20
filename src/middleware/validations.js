const UserModel = require('../model/UserModel');
const errorMessages = require('../dictionary/errorMessages');
const statusCodes = require('../dictionary/statusCodes');

const validateEmailForm = (request, response, next) => {
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

const mandatoryFieldsResolver = (
    isLoginRequest,
    emailOrPasswordIsMissing,
    nameEmailOrPasswordIsMissing,
    response,
) => {
  if (isLoginRequest && emailOrPasswordIsMissing) {
    return response
      .status(statusCodes.UNAUTHORIZED)
      .json({ message: errorMessages.FIELDS_MUST_BE_FILLED });
  }

  if (!isLoginRequest && nameEmailOrPasswordIsMissing) {
    return response
      .status(statusCodes.BAD_REQUEST)
      .json({ message: errorMessages.INVALID_ENTRIES });
  }
};

const validateMandatoryFields = (request, response, next) => {
  const user = request.body;
  const isLoginRequest = request.originalUrl === '/login';
  const emailOrPasswordIsMissing = !user.email || !user.password;
  const nameEmailOrPasswordIsMissing = !user.name || !user.email || !user.password;

  mandatoryFieldsResolver(
    isLoginRequest,
    emailOrPasswordIsMissing,
    nameEmailOrPasswordIsMissing,
    response,
  );

  next();
};

const validateEmailAndPassword = (request, response, next) => {
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
