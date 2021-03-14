const { getRecipeById } = require('../models/recipesModel');

const SUCCESS = 200;
const NOTFOUND = 404;

const errorObj = { message: 'recipe not found' };

const getRecipeByIdMiddleware = async (req, res) => {
  const { id } = req.params;
  let recipe;
  try {
    recipe = await getRecipeById(id);
    if (!recipe) return res.status(NOTFOUND).json(errorObj);
    return res.status(SUCCESS).json(recipe);
  } catch {
    return res.status(NOTFOUND).json(errorObj);
  }
};

module.exports = getRecipeByIdMiddleware;
