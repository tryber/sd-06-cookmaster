const { Router } = require('express');

const RecipesController = new Router();

RecipesController.get('/', (req, res) => {
  res.send('Hello World!');
});

module.exports = RecipesController;