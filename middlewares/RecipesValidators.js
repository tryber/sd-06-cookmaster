const { body, validationResult } = require('express-validator');

const recipeValidationRules = () => [
  body('name')
    .exists(),
  body('ingredients')
    .exists(),
  body('preparation')
    .exists(),
];

const BAD_REQUEST = 400;

const validateRecipe = (req, res, next) => {
  const errors = validationResult(req);
  const errorMsg = { message: 'Invalid entries. Try again.' };

  if (errors.isEmpty()) return next();

  return res.status(BAD_REQUEST).json(errorMsg);
};

module.exports = {
  recipeValidationRules,
  validateRecipe,
};
