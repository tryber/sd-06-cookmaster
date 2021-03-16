const { Router } = require('express');
const express = require('express');
const path = require('path');
const RecipesValidations = require('../services/RecipeServices/RecipeValidation');
const RecipesServices = require('../services/RecipeServices/recipeService');
const VerifyUserToken = require('../services/Authorization/VerifyUserToken');
const CheckCredentials = require('../services/Authorization/CheckUserCredential');
const status = require('../utils/status');
const { UploadConfig, upload } = require('../services/UploadConfig');

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
    res.status(status.OK).json(recipe);
});

route.post('/', 
  RecipesValidations.checkSchema,
  VerifyUserToken,
  async (req, res) => {
    const { name, ingredients, preparation } = req.body;
    const { id: authorId } = res.locals.decoded;
    const recipe = await RecipesServices.createOne({ name, ingredients, preparation, authorId });  
    return res.status(status.CREATED).json({ recipe: { ...recipe } }); 
});

route.put('/:id',
  RecipesValidations.checkSchema,
  RecipesValidations.checkValidId,
  RecipesValidations.checkToken,
  VerifyUserToken,
  CheckCredentials,
  async (req, res) => {
    const { authorId, recipeId } = res.locals;
    const { name, ingredients, preparation } = req.body;
    const recipe = await RecipesServices.updateOne(recipeId,
       { name, ingredients, preparation, authorId });
    return res.status(status.OK).json(recipe);
  });

  route.delete('/:id',
  RecipesValidations.checkValidId,
  RecipesValidations.checkToken,
  VerifyUserToken,
  CheckCredentials,
  async (_req, res) => {
    const { recipeId } = res.locals;
    await RecipesServices.deleteOne(recipeId);
    return res.status(status.DELETED).json({ message: 'recipe deleted' });
  });

  route.use(express.static(path.join(__dirname, '../images')));

  route.put('/:id/image',
   RecipesValidations.checkValidId,
   RecipesValidations.checkToken,
   VerifyUserToken,
   CheckCredentials,
   UploadConfig.deleteImage,
   upload.single('image'),   
   async (req, res) => {
     const { recipeId } = res.locals;
     const imagePath = path.join(UploadConfig.baseURL, req.file.path);
     await RecipesServices.addField(recipeId, imagePath);
     res.status(status.OK).json({ image: imagePath });
   });

  route.use('/', async (err, _req, res, _next) => {
    console.log(err, 'err');
    return res.status(err.status).json({ message: err.message });
  });

  module.exports = route; 