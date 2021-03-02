const BAD_REQUEST = 400;

const validateRecipeData = (name, ingredients, preparation) => {
  if (name && ingredients && preparation) {
    return {
      validName: name,
      validIngredients: ingredients,
      validPreparation: preparation,
    };
  }
  const error = [{ message: 'Invalid entries. Try again.' }, BAD_REQUEST];
  throw error;
};

module.exports = {
  validateRecipeData,
};
