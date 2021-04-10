const {
  addNewRecipe,
  findAllRecipe,
  findByIdRecipe,
  recipeUpdatedModel,
  recipeDeleteModel,
  insertImageModel,
} = require('../models/recipesModel');

const newRecipe = async (req, res, next) => {
  try {
    const { name, ingredients, preparation } = req.body;
    const { _id } = req.user;
    const recipe = await addNewRecipe(name, ingredients, preparation, _id);
    return res.status(201).json({ recipe });
  } catch (err) {
    next(err);
  }
};

const getByIdRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const recipe = await await findByIdRecipe(id);
    return res.status(200).json(recipe);
  } catch (err) {
    return res.status(404).json({ message: 'recipe not found' });
  }
};

const recipeList = async (req, res, next) => {
  try {
    const recipes = await findAllRecipe(); 
    return res.status(200).json(recipes); 
  } catch (error) {
    next(error);
  }
};

const recipeUpdated = async (req, res, next) => {
  try {
    const { name, ingredients, preparation } = req.body;
    const { id } = req.params;

    const recipe = await recipeUpdatedModel(id, name, ingredients, preparation);
    return res.status(200).json(recipe);
  } catch (err) {
    next(err);
  }
};

const recipeDeleted = async (request, response, next) => {
  try {
    const { id } = request.params;
    await recipeDeleteModel(id);
    return response.status(204).send();
  } catch (err) {
    next(err);
  }
};

const insertImage = async (req, res, next) => {
  try {
    const { id } = req.params;
    const image = `localhost:3000/images/${id}.jpeg`;
    const recipe = await insertImageModel(id, image);
    return res.status(200).send(recipe);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  newRecipe,
  recipeList,
  getByIdRecipe,
  recipeUpdated,
  recipeDeleted,
  insertImage,
};
