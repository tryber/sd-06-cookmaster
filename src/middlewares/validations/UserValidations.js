const { validateUser } = require('../../schemas/Users');

const userValidation = async (req, res, next) => {
  const { name, email, password } = req.body;

  const validations = await validateUser(name, email, password);

  if (validations.message) {
    return next({
        statusCode: validations.code,
        customMessage: validations.message,
    }); 
  }

  next();
};

module.exports = userValidation;