const { Router } = require('express');
const RecipesValidations = require('../services/RecipesServices/RecipesValidations');
const RecipesServices = require('../services/RecipesServices/RecipesServices');
const VerifyUserToken = require('../services/Authorization/VerifyUserToken');
const status = require('../utils/status');

const route = Router();

route.get('/', async (_req, res) => {
  const allRecipes = await RecipesServices.findAll();
  res.status(status.OK).json(allRecipes);
});

route.get('/:id',
  RecipesValidations.checkExistentRecipeById,
  async (req, res) => {
    const { id } = req.params;
    const recipe = await RecipesServices.findOneById(id);
    console.log(recipe, '**** recipe ****');
    res.status(status.OK).json(recipe);
});

route.post('/', 
  RecipesValidations.checkSchema,
  VerifyUserToken,
  async (req, res) => {
    const { name, ingredients, preparation } = req.body;
    const recipe = await RecipesServices.createOne({ name, ingredients, preparation });  
    const { id: authorId } = res.locals.decoded;
    return res.status(status.CREATED).json({ recipe: { ...recipe, authorId } }); 
});

route.put('/:id',
  RecipesValidations.checkSchema,
  RecipesValidations.checkValidId,
  RecipesValidations.checkToken,
  VerifyUserToken,
  async (req, res) => {
    console.log(res.locals);
    const { id } = res.locals.recipeId;
    const { name, ingredients, preparation } = req.body;
    const recipe = await RecipesServices.updateOne(id, { name, ingredients, preparation });
    console.log(recipe);
    return res.status(status.OK).json(recipe);
  });

route.use('/', async (err, _req, res, _next) => {
 console.log(err);
 return res.status(err.status).json({ message: err.message });
});

module.exports = route;
