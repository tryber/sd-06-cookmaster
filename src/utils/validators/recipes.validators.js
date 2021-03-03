const { dictionary: { error } } = require('../dictionary');

module.exports = ({ name, ingredients, preparation }) => {
  if (!name || !ingredients || !preparation) throw new Error(error.invalidEntries);
};
