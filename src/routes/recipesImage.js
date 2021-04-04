const { Router } = require('express');

const recipeImage = Router();

recipeImage.get('/:id', (req, res) => {
  const { id } = req.params;
  res.sendFile(`${__dirname}/uploads/${id}`);
});

module.exports = recipeImage;