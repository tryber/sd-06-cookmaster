const Yup = require('yup');
const AppError = require('../utils/AppError');

const { UNAUTHORIZED } = require('../utils/errorStatus');

const LOGIN_SCHEMA = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().required(),
});

async function validateLoginObj(req, _res, next) {
  try {
    await LOGIN_SCHEMA.validate(req.body, {
      abortEarly: true,
    });
    return next();
  } catch (error) {
    if (error instanceof Yup.ValidationError) {
      const validationError = 'All fields must be filled';
      throw new AppError(validationError, UNAUTHORIZED);
    }
    return next(error);
  }
}

module.exports = validateLoginObj;
