const express = require('express');
const multer = require('multer');

const Recipe = require('../controllers/Recipe');
const verifyAuthorization = require('../middlewares/verifyAuthorization');

const recipeRoutes = express.Router();

const storage = multer.diskStorage({
  destination: (request, file, callback) => {
    callback(null, 'uploads');
  },
  filename: (request, file, callback) => {
    callback(null, `${request.params.id}.jpeg`);
  },
});

const upload = multer({ storage });

recipeRoutes.put('/:id/image', verifyAuthorization, upload.single('image'), Recipe.uploadImage);

recipeRoutes.post('/', verifyAuthorization, Recipe.create);

recipeRoutes.put('/:id', verifyAuthorization, Recipe.edit);

recipeRoutes.delete('/:id', verifyAuthorization, Recipe.remove);

recipeRoutes.get('/:id', Recipe.find);

recipeRoutes.get('/', Recipe.findAll);

module.exports = recipeRoutes;
