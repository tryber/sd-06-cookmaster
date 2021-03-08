const Yup = require('yup');
const AppError = require('../utils/AppError');

const USER_SCHEMA = Yup.object().shape({
  name: Yup.string().required(),
  email: Yup.string().email().required(),
  password: Yup.string().required(),

});

async function validateUserObj(req, _res, next) {
  try {
    await USER_SCHEMA.validate(req.body, {
      abortEarly: true,
    });
    return next();
  } catch (error) {
    if (error instanceof Yup.ValidationError) {
      const validationError = 'Invalid entries. Try again.';
      throw new AppError(validationError);
    }
    return next(error);
  }
}

module.exports = validateUserObj;
