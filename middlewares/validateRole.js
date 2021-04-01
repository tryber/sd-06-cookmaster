const rescue = require('express-rescue');

const { getRecipeById } = require('../model/recipesModel');
const { getUserById } = require('../model/userModel');

const HTTP = require('../utils/statusCodeHandler');

const validateRole = rescue(async (request, response, next) => {
  const { id: userIdAuthenticated } = request.user;
  const { id } = request.params;
  const userFromDB = await getUserById(userIdAuthenticated);
  const recipeFromDB = await getRecipeById(id);

  if (!recipeFromDB && userFromDB.role !== 'admin') {
    return response
      .status(HTTP.NOT_FOUND.code)
      .json({ message: HTTP.NOT_FOUND.message });
  }

  if (recipeFromDB.userId !== userIdAuthenticated && userFromDB.role !== 'admin') {
    return response
      .status(HTTP.UNAUTHORIZED.code)
      .json({ message: HTTP.UNAUTHORIZED.message.invalidToken });
  }

  return next();
});

module.exports = {
  validateRole,
};
