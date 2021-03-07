const { Router } = require('express');
const express = require('express');
const multer = require('multer');
const RecipesValidations = require('../services/RecipesServices/RecipesValidations');
const RecipesServices = require('../services/RecipesServices/RecipesServices');
const VerifyUserToken = require('../services/Authorization/VerifyUserToken');
const CheckCredentials = require('../services/Authorization/CheckUserCredential');
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

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'images/');
    },
    filename: (req, file, cb) => {
      cb(null, `${req.params.id}.jpeg`);
    },
  });

  route.use(express.static(`${__dirname}/images`));

  const upload = multer({ storage });
  
  route.put('/:id/image',
   RecipesValidations.checkValidId,
   RecipesValidations.checkToken,
   VerifyUserToken,
   CheckCredentials,
   upload.single('image'),
   async (req, res) => {
     const formData = req.file;
     const { recipeId } = res.locals;
     const imagePath = `localhost:3000/images/${formData.filename}`;
     await RecipesServices.addField(recipeId, imagePath);
     res.status(status.OK).json({ image: imagePath });
   });
  
  route.use('/', async (err, _req, res, _next) => {
    console.log(err);
    return res.status(err.status).json({ message: err.message });
  });
  
  module.exports = route;