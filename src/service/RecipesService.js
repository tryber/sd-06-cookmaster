const Recipes = require('../models/Recipes');

exports.getAll = async () => Recipes.getAll();

exports.create = async (name, ingredients, preparation, userId) => (
  Recipes.create(name, ingredients, preparation, userId)
);
