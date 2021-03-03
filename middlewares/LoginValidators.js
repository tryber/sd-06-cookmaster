const { body, validationResult } = require('express-validator');

const loginValidationRules = () => [
  body('email')
    .exists(),
  body('email')
    .isEmail()
    .withMessage({
      message: 'Incorrect username of password',
    }),
  body('password')
    .exists(),
];

const UNAUTHORIZED = 401;

const validateLogin = (req, res, next) => {
  const errors = validationResult(req);
  const errorMsg = { message: 'All fields must be filled' };

  if (errors.isEmpty()) return next();

  return res.status(UNAUTHORIZED).json(errorMsg);
};

module.exports = { loginValidationRules, validateLogin };
