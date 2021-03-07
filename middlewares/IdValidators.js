const { param, validationResult } = require('express-validator');

const idValidationRules = () => [
  param('id')
    .exists()
    .isMongoId(),
];

const NOT_FOUND = 404;

const validateId = (req, res, next) => {
  const errors = validationResult(req);
  const errorMsg = { message: 'recipe not found' };

  if (errors.isEmpty()) return next();

  return res.status(NOT_FOUND).json(errorMsg);
};

module.exports = {
  idValidationRules,
  validateId,
};
