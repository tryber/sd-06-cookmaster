const express = require('express');
const multer = require('multer');

const Recipe = require('../controllers/Recipe');
const verifyAuthorization = require('../middlewares/verifyAuthorization');

const recipeRoutes = express.Router();

const upload = multer({
  dest: 'uploads',
});

recipeRoutes.post('/', verifyAuthorization, Recipe.create);

recipeRoutes.put('/:id', verifyAuthorization, Recipe.edit);

recipeRoutes.delete('/:id', verifyAuthorization, Recipe.remove);

recipeRoutes.get('/:id', Recipe.find);

recipeRoutes.get('/', Recipe.findAll);

recipeRoutes.put('/:id/image', verifyAuthorization, upload.single('image'), Recipe.image);

module.exports = recipeRoutes;
