const { status, messages } = require('../util/dataStatus');
const {
  createRecipes,
  getRecipesInServer,
  getUnitRecipeInServer,
  editRecipesInServer,
  deletRecipeInServer } = require('../models/modelsRecipes');
const validToken = require('../util/validTokenJWT');
const validateToken = require('../util/validTokenJWT');

const { created, OK, NotFound, NoContent } = status;
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

const editRecipe = async (req, res) => {
  const { id } = req.params;
  const { name, ingredients, preparation } = req.body;

  const { authorization } = req.headers;

  const { role } = validToken(authorization);

  if (role === 'user' || role === 'admin') {
    await editRecipesInServer(id, name, ingredients, preparation);
  }
  
  return res.status(OK).json({
    _id: id,
    name,
    ingredients,
    preparation,
    userId: id,
  });
};

const deleteRecipe = async (req, res) => {
  const { id } = req.params;

  await deletRecipeInServer(id);

  return res.status(NoContent).json();
};

  module.exports = {
    editRecipe,
    registerRecipe,
    getRecipes,
    getRecipesForId,
    deleteRecipe,
  };