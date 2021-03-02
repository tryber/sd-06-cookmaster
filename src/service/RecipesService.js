const Recipes = require('../models/Recipes');

exports.getAll = async () => Recipes.getAll();

exports.findById = async (id) => Recipes.findById(id);

exports.create = async (name, ingredients, preparation, userId) => (
  Recipes.create(name, ingredients, preparation, userId)
);
