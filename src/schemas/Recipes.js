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

module.exports = {
  validateRecipe,
};