const recipeService = require('../services/recipeService');

const OK = 200;
const CREATED = 201;
const NO_CONTENT = 204;
const NOT_FOUND = 404;

const create = async (request, response, next) => {
  try {
    const { name, ingredients, preparation } = request.body;
    const { _id } = request.user;
    const recipe = await recipeService.create(name, ingredients, preparation, _id);
    return response.status(CREATED).json({ recipe });
  } catch (err) {
    next(err);
  }
};

const getAll = async (request, response, next) => {
  try {
    const allRecipes = await recipeService.getAll();
    return response.status(OK).json(allRecipes);
  } catch (err) {
    next(err);
  }
};

const findById = async (request, response) => {
  try {
    const { id } = request.params;
    const recipe = await recipeService.findById(id);
    return response.status(OK).json(recipe);
  } catch (err) {
    return response.status(NOT_FOUND).json({ message: 'recipe not found' });
  }
};

const update = async (request, response, next) => {
  try {
    const { name, ingredients, preparation } = request.body;
    const { id } = request.params;
    const recipe = await recipeService.update(id, name, ingredients, preparation);
    return response.status(OK).json(recipe);
  } catch (err) {
    next(err);
  }
};

const addImage = async (request, response, next) => {
  try {
    const { id } = request.params;
    const image = `localhost:3000/images/${id}.jpeg`;
    const recipe = await recipeService.addImage(id, image);
    return response.status(OK).send(recipe);
  } catch (err) {
    next(err);
  }
};

const remove = async (request, response, next) => {
  try {
    const { id } = request.params;
    await recipeService.remove(id);
    return response.status(NO_CONTENT).send();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  create,
  getAll,
  findById,
  update,
  addImage,
  remove,
};