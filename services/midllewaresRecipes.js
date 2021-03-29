const { ObjectId } = require('mongodb');

const status400 = 400;
const status404 = 404;
const msgInvalidEntries = 'Invalid entries. Try again.';

const {
  getRecipeById,
} = require('../models/queryRecipes');

const nameExists = (req, res, next) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(status400).json({ message: msgInvalidEntries });
    }
  } catch (err) {
    console.log(err);
  }
  next();
};

const ingredientsExists = (req, res, next) => {
  try {
    const { ingredients } = req.body;
    if (!ingredients) {
      return res.status(status400).json({ message: msgInvalidEntries });
    }    
  } catch (err) {
    console.log(err);
  }
  next();
};

const preparationExists = (req, res, next) => {
  try {
    const { preparation } = req.body;
    if (!preparation) {
      return res.status(status400).json({ message: msgInvalidEntries });
    }
  } catch (err) {
    console.log(err);
  }
  next();
};

const recipeExists = async (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  try {
    if (!ObjectId.isValid(id)) {
      return res.status(status404).json({ message: 'recipe not found' });
    }
    const recipeDb = await getRecipeById(id);
    if (!recipeDb) {
      return res.status(status404).json({ message: 'recipe not found' });
    }
  } catch (err) {
    console.log(err);
  }
  next();
};

module.exports = {
  nameExists,
  ingredientsExists,
  preparationExists,
  recipeExists,
};
