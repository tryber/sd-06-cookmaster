// const bcrypt = require('bcryptjs');
const mongoose = require('./dataBase');

const RecipesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  ingredients: {
    type: String,
  },
  preparation: {
    type: String,
  },
});

const Recipes = mongoose.model('recipes', RecipesSchema);

module.exports = Recipes;
