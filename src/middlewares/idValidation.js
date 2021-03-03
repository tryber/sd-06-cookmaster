const { ObjectId } = require('mongodb');
const RecipesModel = require('../models/recipesModel');

const IdValidation = async (req, res, next) => {
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    return res.status(404).json({
      message: 'recipe not found',
    });
  }

  const idExists = await RecipesModel.findById(id);

  if (!idExists) {
    return res.status(404).json({
      message: 'recipe not found',
    });
  }

  next();
};

module.exports = IdValidation;
