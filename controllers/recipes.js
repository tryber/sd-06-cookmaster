const rescue = require('express-rescue');
const routes = require('express').Router();
const recipes = require('../services/recipes');
const validateJWT = require('../auth/validateJWT');

const OK = 200;
const CREATED = 201;
// const BAD_REQUEST = 400;
// const NOT_FOUND = 404;
const UNPROCESSABLE_ENTITY = 422;

routes.route('/:id')
  .get(rescue(async (req, res, next) => {
    const { id } = req.params;
    const searchedRecipe = await recipes.findById(id);

    if (searchedRecipe.err) {
      return next({ ...searchedRecipe.err });
    }

    res.status(OK).json(searchedRecipe);
  }))
  .put(validateJWT, rescue(async (req, res, next) => {
    const { id } = req.params;
    const updateRecipe = req.body;
    const loggedUser = req.user;
    const recipeToUpdate = await recipes.update(id, updateRecipe, loggedUser);

    if (recipeToUpdate.err) {
      return next({ ...recipeToUpdate.err });
    }

    res.status(OK).json(recipeToUpdate);
  }))
  .delete(rescue(async (req, res) => {
    const { id } = req.params;
    const productToDelete = await recipes.deleteProduct(id);

    if (productToDelete === null || productToDelete.err) {
      return res.status(UNPROCESSABLE_ENTITY).json(productToDelete);
    }

    res.status(OK).json(productToDelete);
  }));

routes.route('/')
  .get(rescue(async (_req, res) => {
    const recipesArray = await recipes.getAll();

    res.status(OK).json(recipesArray);
  }))
  .post(validateJWT, rescue(async (req, res, next) => {
    const { name, ingredients, preparation } = req.body;
    const { _id } = req.user;
    const createdRecipe = await recipes.create(name, ingredients, preparation, _id);
    
    if (createdRecipe.err) {
      return next({ ...createdRecipe.err });
    }

    res.status(CREATED).json({ recipe: createdRecipe });
  }));

module.exports = routes;
