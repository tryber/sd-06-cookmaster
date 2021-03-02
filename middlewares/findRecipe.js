const { findRecipeById } = require('../services/recipesServices');

const NOT_FOUND = 404;

module.exports = async (req, res, next) => {
  try {
    const { id } = req.params;
    const findRecipe = await findRecipeById(id);
    if (findRecipe === false) {
      return res.status(NOT_FOUND).send({
        message: 'recipe not found',
      });
    }
    next();
  } catch (e) {
    throw new Error(e);
  }
};
