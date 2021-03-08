const Yup = require('yup');
const AppError = require('../utils/AppError');

const RECIPE_SCHEMA = Yup.object().shape({
  name: Yup.string().required(),
  ingredients: Yup.string().required(),
  preparation: Yup.string().required(),
});

async function validateRecipeObj(req, _res, next) {
  try {
    await RECIPE_SCHEMA.validate(req.body, {
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

module.exports = validateRecipeObj;
