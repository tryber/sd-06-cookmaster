const { ObjectId } = require('mongodb');
const recipesModel = require('../models/recipesModel');

const NOT_FOUND = 404;

const getAll = async () => recipesModel.getAll();

const create = async (data) => recipesModel.create(data);

const getById = async (id) => recipesModel.getById(id);

const update = async (id, data) => recipesModel.update(id, data);

const remove = async (id) => recipesModel.remove(id);

const ERR = 400;

const validate = async (req, res, next) => {
const { name, ingredients, preparation } = req.body;

if (!name || !ingredients || !preparation) {
  return res.status(ERR).json({ message: 'Invalid entries. Try again.' });
}
next();
};

const idValidation = (req, res, next) => {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) return res.status(NOT_FOUND).json({ message: 'recipe not found' });
  next();
};

module.exports = {
  getAll,
  create,
  validate,
  getById,
  idValidation,
  update,
  remove,
};
