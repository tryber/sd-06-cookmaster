const { status, messages } = require('../util/dataStatus');
const {
  createRecipes,
  getRecipesInServer,
  getUnitRecipeInServer } = require('../models/modelsRecipes');
const validateToken = require('../util/validTokenJWT');

const { created, OK, NotFound } = status;
const { recipeNotFound } = messages;

const registerRecipe = async (req, res) => {
    const { name, ingredients, preparation } = req.body;
    const { authorization } = req.headers;
    
    const user = validateToken(authorization);

    const resultRegisterRecipeinServer = await createRecipes(
      name,
      ingredients,
      preparation,
      user.id,
);
    
    return res.status(created).json(resultRegisterRecipeinServer);
  };

const getRecipes = async (_req, res) => {
  const resultRecipesInServer = await getRecipesInServer();
  return res.status(OK).json(resultRecipesInServer);
};

const getRecipesForId = async (req, res) => {
  const { id } = req.params;

  const resultUnitRecipeFindById = await getUnitRecipeInServer(id);

  if (!resultUnitRecipeFindById) return res.status(NotFound).json(recipeNotFound);

  return res.status(OK).json(resultUnitRecipeFindById);
};

  module.exports = {
    registerRecipe,
    getRecipes,
    getRecipesForId,
  };