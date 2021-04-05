const { Router } = require('express');

const recipeImage = Router();

recipeImage.get('/:id.jpeg', async (req, res) => {
  const { id } = req.params;
  
  res.sendFile(`uploads/${id}.jpeg`, { root: '.' });
});

module.exports = recipeImage;