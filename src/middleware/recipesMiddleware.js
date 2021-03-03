const {
  validationRecipesKeysExists,
} = require('../validations/recipesValidatios');

const {
  objMessageError,
} = require('../useful/funcsObjUseful');

const validationRecipesBody = async (req, res, next) => {
  const { body } = req;

  const error = validationRecipesKeysExists(body);
  if (error) {
    const { message, status } = error;
    return res.status(status).json(objMessageError(message));
  }

  next();
};

module.exports = {
  validationRecipesBody,
};