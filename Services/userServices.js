const model = require('../Models/userModels');
const { validate, duplicatedEmail } = require('../Schemas/userSchema');

const create = async (name, email, password) => {
  const validations = validate(name, email, password);

  if (validations.message) {
    return validations;
  }

  const verifiedEmail = await duplicatedEmail(email);

  if (verifiedEmail.message) {
    return verifiedEmail;
  }

  return model.create(name, email, password);
};

module.exports = {
  create,
};
