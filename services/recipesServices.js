const recipesModel = require('../models/recipesModel');

const getAll = async () => recipesModel.getAll();

const create = async (data) => recipesModel.create(data);

const getById = async (id) => recipesModel.getById(id);

const ERR = 400;

const validate = async (req, res, next) => {
const { name, ingredients, preparation } = req.body;

if (!name || !ingredients || !preparation) {
  return res.status(ERR).json({ message: 'Invalid entries. Try again.' });
}
next();
};

module.exports = {
  getAll,
  create,
  validate,
  getById,
};
