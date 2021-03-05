const yup = require('yup');
const { validationError, notFoundError } = require('../../utils/error');
const Recipes = require('../../models/Recipes');

const invalidEntries = 'Invalid entries. Try again.';

const RecipesSchema = yup.object().shape({
  name: yup.string().required(invalidEntries),
  preparation: yup.string().required(invalidEntries),
  ingredients: yup.string().required(invalidEntries),

});

const RecipesValdiations = {
  async checkSchema(req, _res, next) {
    const { name, preparation, ingredients } = req.body;
    try {
      await RecipesSchema.validate({ name, preparation, ingredients });
      next();
    } catch (err) {
      next(validationError(err.message));
    }
  },
  async checkExistentRecipeById(req, _res, next) {
    const { id } = req.params;
    console.log(id, 'check id');
    try {
      const recipe = await Recipes.findOne(id);
      console.log(recipe, 'recipe return');
      if (!recipe) throw notFoundError('not found recipe');
      next();
    } catch (err) {
      next(notFoundError('recipe not found'));
    }
  },
};

module.exports = RecipesValdiations;