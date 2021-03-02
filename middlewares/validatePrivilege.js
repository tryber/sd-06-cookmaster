const { ObjectId } = require('mongodb');
const { findRecipeById } = require('../services/recipesServices');

const NOT_FOUND = 400;
const UNAUTH = 401;

module.exports = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { role, _id: userId } = req.user;
    const findRecipe = await findRecipeById(id);
    if (findRecipe === false) {
      return res.status(NOT_FOUND).send({
        message: 'recipe not found',
      });
    }
    if (role !== 'admin' && !ObjectId(userId).equals(ObjectId(findRecipe.userId))) {
      return res.status(UNAUTH).json({ message: 'jwt malformed' });
    }
    req.recipe = findRecipe;
    next();
  } catch (e) {
    return res.status(UNAUTH).json(e);
  }
};
