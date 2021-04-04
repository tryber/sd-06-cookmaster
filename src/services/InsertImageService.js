const { updateImageRecipe } = require('../models/Recipes');

const insertImageService = async (req, res) => {
  const { id } = req.params;
  const { filename } = req.file;

  const imagePath = `${req.headers.host}/images/${filename}`;

  const recipe = await updateImageRecipe(id, imagePath);
  
  return res.status(200).send(recipe);
};

module.exports = {
  insertImageService,
};