const { Router } = require('express');
const RecipesValidations = require('../services/RecipesServices/RecipesValidations');
const RecipesServices = require('../services/RecipesServices/RecipesServices');
const VerifyUserToken = require('../services/Authorization/VerifyUserToken');
const status = require('../utils/status');

const route = Router();

route.get('/', async (_req, res) => {
  const allRecipes = await RecipesServices.findAll();
  res.status(status.OK).json({ recipes: allRecipes });
});

route.post('/', 
  RecipesValidations.checkSchema,
  VerifyUserToken,
  async (req, res) => {
    const { name, ingredients, preparation } = req.body;
    const recipe = await RecipesServices.createOne({ name, ingredients, preparation });  
    const { id: authorId } = res.locals.decoded;
    console.log(authorId);
    return res.status(status.CREATED).json({ recipe: { ...recipe, authorId } }); 
});

route.use('/', async (err, _req, res, _next) => {
 console.log(err);
 return res.status(err.status).json({ message: err.message });
});

module.exports = route;
