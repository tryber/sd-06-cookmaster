const { 
  createRecipe,
  getAllRecipes,
  getByIdRecipe,
  updateRecipe,
  deleteRecipe,
} = require('../models/RecipesModel');

const STATUS_OK = 200;
const STATUS_CREATED = 201;
const STATUS_NO_CONTENT = 204;
const STATUS_UNAUTHORIZED = 401;

const RecipesCreateService = async (req, res, _next) => {
  const { _id } = req.user;
  console.log(_id);
  const { name, ingredients, preparation } = req.body;
  const insertedId = await createRecipe(name, ingredients, preparation);
  return res.status(STATUS_CREATED).json({ recipe: {
    name, 
    ingredients, 
    preparation,
    userId: _id,
    _id: insertedId,
  } });
};

const RecipesGetAllService = async (_req, res) => {
  const recipes = await getAllRecipes();
  return res.status(STATUS_OK).json(recipes);
};

const RecipeGetByIdService = async (req, res) => {
  const { id } = req.params;
  const recipe = await getByIdRecipe(id);
  return res.status(STATUS_OK).json(recipe);
};

const RecipeUpdateService = async (req, res) => {
  const { id } = req.params;
  const { name, ingredients, preparation } = req.body;
  const { _id, role } = req.user;
  try {
    if (role === 'admin' || _id === id) {
      await updateRecipe(id, name, ingredients, preparation);
    }
  } catch (e) {
    res.status(STATUS_UNAUTHORIZED).json({ message: e.message });
  }

  const updatedRecipe = await getByIdRecipe(id);
  return res.status(STATUS_OK).json(updatedRecipe);
};

const RecipeDeleteService = async (req, res) => {
  const { id } = req.params;
  await deleteRecipe(id);
  return res.status(STATUS_NO_CONTENT).send();
};

module.exports = {
  RecipesCreateService,
  RecipesGetAllService,
  RecipeGetByIdService,
  RecipeUpdateService,
  RecipeDeleteService,
};
