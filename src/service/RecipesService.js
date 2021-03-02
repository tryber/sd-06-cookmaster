const Recipes = require('../models/Recipes');

exports.create = async (name, ingredients, preparation, userId) => (
  Recipes.create(name, ingredients, preparation, userId)
);
