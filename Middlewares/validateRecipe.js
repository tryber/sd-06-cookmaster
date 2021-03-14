const validateRecipeFields = require('../Schemas/recipeSchema');

module.exports = async (req, res, next) => {
  const { name, ingredients, preparation } = req.body;

  const verifyFields = validateRecipeFields(name, ingredients, preparation);

  if (verifyFields.code) {
    return res.status(verifyFields.code).send({ message: verifyFields.message });
  }

  next();
};
