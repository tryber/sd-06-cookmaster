const { validateRecipe, validateRecipeId, validateUserAndRole } = require('../../schemas/Recipes');
const Recipes = require('../../services/Recipes');

const recipeValidation = async (req, res, next) => {
  const { name, ingredients, preparation } = req.body;

  const validations = await validateRecipe(name, ingredients, preparation);

  if (validations.message) {
    return next({
        statusCode: validations.code,
        customMessage: validations.message,
    }); 
  }

  next();
};

const idValidation = (req, _res, next) => {
  const { id } = req.params;
  const validation = validateRecipeId(id);

  if (validation.customMessage) return next(validation);

  next();
};

const userAndRoleValidation = async (req, res, next) => {
  const { id } = req.params;
  const { _id: userId, role } = req.user;
  const recipe = await Recipes.getRecipeById(id);
  if (recipe.customMessage) return next(recipe);

  req.recipe = recipe;

  const validation = validateUserAndRole(recipe.userId, userId, role);

  if (validation.customMessage) return next(validation);

  next();
};

module.exports = {
  recipeValidation,
  idValidation,
  userAndRoleValidation,
};