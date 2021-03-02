const { 
  createRecipe,
} = require('../models/RecipesModel');
const { getAllRecipes, getByIdRecipe } = require('../models/RecipesModel');

const STATUS_OK = 200;
const STATUS_CREATED = 201;

const RecipesCreateService = async (req, res, _next) => {
  const { name, ingredients, preparation } = req.body;
  const recipe = await createRecipe(name, ingredients, preparation);
  return res.status(STATUS_CREATED).json({ recipe });
};

// const RecipesCreateService = async (req, res, _next) => {
//   const token = req.headers.authorization;
//   const { name, ingredients, preparation } = req.body;
//   const decoded = jwt.verify(token, secret);
//   const data = await findUser(decoded.data.email);
//   const recipe = await createRecipe(name, ingredients, preparation);
//   return res.status(STATUS_CREATED)
//     .json({ 
//       recipe: { 
//         name: recipe.name, 
//         ingredients: recipe.ingredients, 
//         preparation: recipe.preparation, 
//         userId: data._id, 
//         _id: recipe._id
//       },
//     });
// };

const RecipesGetAllService = async (_req, res) => {
  const recipes = await getAllRecipes();
  return res.status(STATUS_OK).json(recipes);
};

const RecipeGetByIdService = async (req, res) => {
  const { id } = req.params;
  const recipe = await getByIdRecipe(id);
  return res.status(STATUS_OK).json(recipe);
};

module.exports = {
  RecipesCreateService,
  RecipesGetAllService,
  RecipeGetByIdService,
};
