const { validate } = require('../Schema/RecipeSchema');

const validateRecipe = async (req, res, next) => {
  const { name, ingredients, preparation } = req.body;

  const { code, message } = await validate(name, ingredients, preparation);

  if (message) return res.status(code).json({ message });

  next();
};

module.exports = {
  validateRecipe,
};
