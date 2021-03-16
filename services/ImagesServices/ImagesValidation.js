const RecipesServices = require('../RecipeServices/recipeService');
const { validationError } = require('../../utils/error');

const ImagesValidation = {
  async checkFilename(req, res, next) {
    const { filename } = req.params;
      try {
      const id = filename.split('.')[0];
        const recipe = await RecipesServices.findOneById(id);
        res.locals.imagePath = recipe.image;
        res.locals.recipeId = id;
        res.locals.authorId = recipe.authorId;
        next();
      } catch (err) {
        next(validationError('invalid Entries'));
      }
  },
};

module.exports = ImagesValidation;
