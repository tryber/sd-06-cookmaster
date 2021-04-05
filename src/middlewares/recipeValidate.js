const recipeValidate = async (name, ingredients, preparation) => {
  const errMessage = 'Invalid entries. Try again.';

  if (!name || !ingredients || !preparation) return { err: { status: 400, message: errMessage } };

  return false;
};

module.exports = {
  recipeValidate,
};