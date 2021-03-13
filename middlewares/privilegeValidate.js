const { ObjectId } = require('mongodb');
const { getRecipeById } = require('../services/userServices');

const UNAUTH = 401;

module.exports = async (req, res, next) => {
  try {
    const { role, _id: userId } = req.user;
    const { id } = req.params;

    const findRecipe = await getRecipeById(id);

    if (role !== 'admin' && !ObjectId(userId).equals(ObjectId(findRecipe.userId))) {
      return res.status(UNAUTH).json({ message: 'jwt malformed' });
    }

    req.recipe = findRecipe;

    next();
  } catch (e) {
    return res.status(UNAUTH).json(e);
  }
};