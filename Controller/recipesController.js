const jwt = require('jsonwebtoken');
const recipesModel = require('../Models/recipesModel');
const usersModel = require('../Models/usersModel');

const created = 201;
const OK = 200;
const segredo = 'cabeça';

const getAll = async (req, res) => {
  const getAllRecipes = await recipesModel.getAll();

  res.status(OK).json(getAllRecipes);

  /* const token = req.headers.authorization;
  const verify = jwt.verify(token, segredo);
  if (verify) {
    return res.status(OK).json(getAllRecipes);
  } */
};

const create = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const token = req.headers.authorization;
  const decoded = jwt.verify(token, segredo);
  const { data } = decoded;
  const getUser = await usersModel.getByEmail(data.email);
  const { _id: id } = getUser;

  const creation = await recipesModel.create(name, ingredients, preparation);
  const addRecipe = {
    name,
    ingredients,
    preparation,
    userId: id,
    _id: creation.insertedId,
  };

  res.status(created).json({ recipe: addRecipe });
};

module.exports = {
  getAll,
  create,
};