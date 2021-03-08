const { create } = require('../models/RecipesModel');

const status = require('../utils/allStatusCode'); 

const RecipesServices = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  
  if (!name || !ingredients || !preparation) {
    return res.status(status.BAD_REQUEST).json({ message: 'Invalid entries. Try again.' });
  }

  const { _id } = req.user;
  const { insertedId } = await create(name, ingredients, preparation);
  return res.status(status.CREATED).json({ recipe: {
    name, 
    ingredients, 
    preparation,
    userId: _id,
    _id: insertedId,
  } });
};

module.exports = RecipesServices;