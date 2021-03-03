const erros = {
  invalid_entries: { code: 400, message: 'Invalid entries. Try again.' },
};

const isBlank = (field) => !field || field === '';

const validate = async (name, ingredients, preparation) => {
  switch (true) {
    case isBlank(name): return erros.invalid_entries;
    case isBlank(ingredients): return erros.invalid_entries;
    case isBlank(preparation): return erros.invalid_entries;
    default: return {};
  }
};

module.exports = {
  validate,
};
