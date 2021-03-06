const RecipesService = require('../services/RecipesService');

const FORBIDDEN = 403;

function hasRecipeOwnership(userId, recipeUserId) {
  return userId.toString() === recipeUserId.toString();
}

function hasAdminRole(role) {
  return role === 'admin';
}

async function checkPermissions(request, response, next) {
  const { _id: userId, role } = request.user;
  const { id: requestRecipeId } = request.params;
  const { userId: recipeUserId } = await RecipesService.findById(requestRecipeId);
  const isUserRecipeOwner = hasRecipeOwnership(userId, recipeUserId);
  const isUserAdmin = hasAdminRole(role);
  if (!isUserRecipeOwner && !isUserAdmin) {
    next(
      {
        code: FORBIDDEN,
        errorMessage: { message: 'User not allowed' },
      },
    );
  }
  next();
}

module.exports = checkPermissions;
