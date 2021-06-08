const RecipesService = require('../service/recipesService');

const FORBIDDEN = 403;

const errorObject = {
  code: FORBIDDEN,
  errorMessage: { message: 'User not allowed' },
};

function hasRecipeOwnership(userId, recipeUserId) {
  return userId.toString() === recipeUserId.toString();
}

function hasAdminRole(role) {
  return role === 'admin';
}

async function checkPermissions(request, response, next) {
  const { _id: userId, role } = request.user;
  const { id: requestRecipeId } = request.params;
  const recipe = await RecipesService.findById(requestRecipeId);
  if (recipe.error) {
    return next(
      {
        code: recipe.error.code,
        errorMessage: recipe.error.message,
      },
    );
  }
  const { userId: recipeUserId } = recipe;
  const isUserRecipeOwner = hasRecipeOwnership(userId, recipeUserId);
  const isUserAdmin = hasAdminRole(role);
  if (!isUserRecipeOwner && !isUserAdmin) {
    return next(errorObject);
  }
  next();
}

module.exports = checkPermissions;
