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
// const STATUS_UNAUTHORIZED = 401;

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
  const image = 'no image yet';
  // VALIDAÇÔES DO ADMIN
  // if (role === 'admin' || _id === id) {
  // const { _id, role } = req.user;
  // Consulta da receita pelo id pra retornar o userID e comparar com o _id;
  // } 
  // Senão status.error!
  await updateRecipe({ id, name, ingredients, preparation, image });
  const updatedRecipe = await getByIdRecipe(id);
  return res.status(STATUS_OK).json(updatedRecipe);
};

const RecipeDeleteService = async (req, res) => {
  const { id } = req.params;
  await deleteRecipe(id);
  return res.status(STATUS_NO_CONTENT).send();
};

const UploadImageService = async (req, res) => {
  const { id } = req.params;
  // const { userId } = req.user;
  // console.log(userId);
  const { filename } = req.file;
  const image = `localhost:3000/images/${filename}`;
  const { _id, name, ingredients, preparation } = await getByIdRecipe(id);
  await updateRecipe(id, name, ingredients, preparation, image);
  res.status(STATUS_OK).json({ 
    _id,
    name, 
    ingredients, 
    preparation,
    // userId, 
    image,
  });
};

module.exports = {
  RecipesCreateService,
  RecipesGetAllService,
  RecipeGetByIdService,
  RecipeUpdateService,
  RecipeDeleteService,
  UploadImageService,
};
