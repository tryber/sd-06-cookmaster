const UserModel = require('../model/UserModel');
const errorMessages = require('../dictionary/errorMessages');
const statusCodes = require('../dictionary/statusCodes');

const validateEmailForm = async (request, response, next) => {
  const user = request.body;
  const { email } = user;
  // const emailValidator = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
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

  if (!user.name || !user.email || !user.password) {
    return response
      .status(statusCodes.BAD_REQUEST)
      .json({ message: errorMessages.INVALID_ENTRIES });
  }

  next();
};

module.exports = {
  validateEmailForm,
  validateEmailUniqueness,
  validateMandatoryFields,
};
