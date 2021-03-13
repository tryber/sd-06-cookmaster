const express = require('express');
const rescue = require('express-rescue');
const multer = require('multer');
// const path = require('path');
const RecipesService = require('../services/RecipesService');
const { verifyToken } = require('../utils');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'uploads/');
  },
    filename: (req, file, callback) => {
      callback(null, 
        `${JSON.stringify(req.params.id).replace(/"/g, '')}.jpeg`); // path.extname(file.originalname)
  },
});

const upload = multer({ storage });

router.post('/', 
  rescue(verifyToken), 
  rescue(RecipesService.verifyFields),
  rescue(RecipesService.insertRecipe));

router.get('/', rescue(RecipesService.getAll));

router.get('/:id', rescue(RecipesService.findById));

router.put('/:id', 
  rescue(verifyToken), 
  rescue(RecipesService.verifyFields),
  rescue(RecipesService.updateRecipe));

router.delete('/:id', 
  rescue(verifyToken),
  rescue(RecipesService.deleteRecipe));

router.put('/:id/image',
  rescue(verifyToken),
  upload.single('image'),
  RecipesService.insertImageInfo);

module.exports = router;
