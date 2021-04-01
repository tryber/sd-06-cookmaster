const rescue = require('express-rescue');

const { getRecipeByUserId } = require('../model/recipesModel');
const { getUserById } = require('../model/userModel');

const HTTP = require('../utils/statusCodeHandler');

const validateRole = rescue(async (request, response, next) => {
  const { id: userIdAuthenticated } = request.user;

  const userFromDB = await getUserById(userIdAuthenticated);
  const recipeFromDB = await getRecipeByUserId(userIdAuthenticated);

  if (!recipeFromDB) {
    return response
      .status(HTTP.NOT_FOUND.code)
      .json({ message: HTTP.NOT_FOUND.message });
  }

  if (recipeFromDB.userId !== userIdAuthenticated && userFromDB.role !== 'admin') {
    return response.status(HTTP.UNAUTHORIZED.code)
      .json({ message: HTTP.UNAUTHORIZED.message.invalidToken });
  }

  return next();
});

module.exports = {
  validateRole,
};
