/* const express = require('express');
const multer = require('multer');
const Recipes = require('../model/RecipesModel');

const app = express();

app.use(express.static(__dirname + '/uploads'));

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    const path = path.resolve(__dirname, '..', 'uploads')
    console.log(path);
    callback(null, path);
  },
  filename: (req, file, callback) => {
    callback(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

const addImage = async (id, path) => 
  Recipes.addImage(id, path);

module.exports = {
  addImage,
}; */
