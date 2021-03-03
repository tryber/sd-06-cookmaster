const Recipes = require('../models/Recipes');

const NOTFOUND = 404;
const IDLENGTH = 24;
const message = 'recipe not found';

const validateRecipeId = async (req, res, next) => {
  const { id } = req.params;

  if (id.length !== IDLENGTH) res.status(NOTFOUND).json({ message });
  if (!id) return res.status(NOTFOUND).json({ message });

  const recipe = await Recipes.getRecipesById(id);
  if (!recipe) return res.status(NOTFOUND).json({ message });

  next();
};

module.exports = validateRecipeId;