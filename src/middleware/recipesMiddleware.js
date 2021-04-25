const jwt = require('jsonwebtoken');

const {
  validationRecipesKeysExists,
  validationRecipeUserAllowed,
} = require('../validations/recipesValidations');

const {
  objMessageError,
} = require('../useful/funcsObjUseful');

const validationRecipesBody = (req, res, next) => {
  const { body } = req;

  const error = validationRecipesKeysExists(body);
  if (error) {
    const { message, status } = error;
    return res.status(status).json(objMessageError(message));
  }

  next();
};

const verifyAutorOfRecipe = async (req, res, next) => {
  const {
    params: { id: idRecipe },
    headers: { authorization: token },
  } = req;
  const { _id: userId, role } = jwt.decode(token);

  if (role !== 'admin') {
    const error = await validationRecipeUserAllowed(idRecipe, userId);
    if (error) {
      const { message, status } = error;
      return res.status(status).json(objMessageError(message));
    }
  }

  next();
};

module.exports = {
  validationRecipesBody,
  verifyAutorOfRecipe,
};