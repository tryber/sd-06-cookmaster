const blank = (value) => (!value);
const stringField = (value) => typeof value !== 'string';

const blankCode = 400;
const blankMessage = 'Invalid entries. Try again.';

const validateRecipeFields = (name, ingredients, preparation) => {
  switch (true) {
    case blank(name):
    case blank(ingredients):
    case blank(preparation):
    case stringField(name):
    case stringField(ingredients):
    case stringField(preparation): return { code: blankCode, message: blankMessage };
    default: return {};
  }
};

module.exports = validateRecipeFields;
