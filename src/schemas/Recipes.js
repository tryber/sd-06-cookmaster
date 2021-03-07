const { ObjectID } = require('mongodb');

const isBlank = (field) => !field || field === '';

const validateRecipe = (name, ingredients, preparation) => {
  const invalidEntries = { code: 400, message: 'Invalid entries. Try again.' };

  switch (true) {
    case isBlank(name): return invalidEntries;
    case !ingredients: return invalidEntries;
    case isBlank(preparation): return invalidEntries;

    default: return {};
  }
};

const validateRecipeId = (id) => {
  const recipeNotFound = { statusCode: 404, customMessage: 'recipe not found' };
  const isIdValid = ObjectID.isValid(id);

  if (!isIdValid) return recipeNotFound;

  return {};
};

const validateUserAndRole = (id, userId, role) => {
  const invalidUserOrRole = { statusCode: 401, customMessage: 'invalid user or role' };
  const isUserValid = String(id) === String(userId);
  const isRoleAdmin = role === 'admin';

  if (!isUserValid && !isRoleAdmin) return invalidUserOrRole;

  return {};
};

module.exports = {
  validateRecipe,
  validateRecipeId,
  validateUserAndRole,
};