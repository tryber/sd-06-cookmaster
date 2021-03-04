const { ObjectId } = require('mongodb');
const recipesService = require('../Services/recipesService');

const validateEntries = (req, _res, next) => {
    const { name, ingredients, preparation } = req.body;
    if (!name || !ingredients || !preparation) {
 return next({
        status: 400,  
        message: 'Invalid entries. Try again.',
      }); 
}
    next();
  };

  const validateId = (req, _res, next) => {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
 return next({
        status: 404,  
        message: 'recipe not found',
      }); 
}
    next();
  };

  const recipeExists = async (req, _res, next) => {
    const { id } = req.params;
    const recipeFound = await recipesService.recipeByIdService(id);

    if (!recipeFound) {
 return next({
        status: 404,  
        message: 'recipe not found',
      }); 
}
    next();
  };

  module.exports = {
    validateEntries,
    validateId,
    recipeExists,
  };