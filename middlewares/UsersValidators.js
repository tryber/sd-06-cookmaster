const { body, validationResult } = require('express-validator');

const userValidationRules = () => [
  body('name')
    .exists(),
  body('email')
    .exists()
    .isEmail(),
  body('password')
    .exists(),
];

const BAD_REQUEST = 400;

const validateUser = (req, res, next) => {
  const errors = validationResult(req);
  const errorMsg = { message: 'Invalid entries. Try again.' };

  if (errors.isEmpty()) return next();

  return res.status(BAD_REQUEST).json(errorMsg);
};

module.exports = { userValidationRules, validateUser };
