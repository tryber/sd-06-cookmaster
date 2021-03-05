const yup = require('yup');
const { validationError } = require('../../utils/error');

const invalidEntries = 'Invalid entries. Try again.';

const RecipesSchema = yup.object().shape({
  name: yup.string().required(invalidEntries),
  preparation: yup.string().required(invalidEntries),
  ingredients: yup.string().required(invalidEntries),

});

const RecipesValdiations = {
  async checkSchema(req, _res, next) {
    const { name, preparation, ingredients } = req.body;
    console.log('recipes validations', name, preparation, ingredients);
    try {
      await RecipesSchema.validate({ name, preparation, ingredients });
      next();
    } catch (err) {
      next(validationError(err.message));
    }
  },
};

module.exports = RecipesValdiations;