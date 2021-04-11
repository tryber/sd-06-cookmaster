const validateRecipes = (newRecipe) => {
  const { name, ingredients, preparation } = newRecipe;
  if (name === undefined || ingredients === undefined || preparation === undefined) {
    return false;
  }
  return true;
};

module.exports = validateRecipes;
