const {
  recipesServices,
  recipesValidations: recValid,
  usersServices,
} = require('../services');

const { validateToken: valid } = require('../authentication');
const { dataResponse: data } = require('../utilsData');

const createRecipe = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { authorization: token } = req.headers;
  const { email } = await valid.validateToken(token);
  const user = await usersServices.selectUser(email);
  const id = '_id';
  const dataRec = {
    name,
    ingredients,
    preparation,
    userId: user[id],
  };
  const recipe = await recipesServices.create(dataRec);
  res.status(201).json({ recipe });
};

const verifyBodyRecipe = async (req, res, next) => {
  const bodyData = req.body;
  const isValid = await recValid.validateBody(bodyData);
  if (isValid) return res.status(data.status.bad_request).json(data.objAnswer.err_body.err1);
  next();
};

const listRecipes = async (req, res) => {
  const recipesList = await recipesServices.getAll();
  if (recipesList) return res.status(data.status.ok).json(recipesList);
  return res.status(data.status.bad_request).json({ message: 'internal error' });
};

const listForId = async (req, res) => {
  const { id } = req.params;
  const correctLength = 24;
  if (id.length !== correctLength) {
    return res.status(data.status.notFound).json(data.objAnswer.err_search);
  }
  const recipe = await recipesServices.getById(id);
  if (recipe) return res.status(data.status.ok).json(recipe);
  return res.status(data.status.notFound).json(data.objAnswer.err_search);
};

const updateRecipe = async (req, res) => {
  const { id } = req.params;
  const value = await recipesServices.update(id, req.body);
  return res.status(200).json(value);
};

const delRecipe = async (req, res) => {
  const { id } = req.params;
  await recipesServices.delRecipe(id);
  return res.status(data.status.okNoContent).json();
};

module.exports = {
  createRecipe,
  verifyBodyRecipe,
  listRecipes,
  listForId,
  updateRecipe,
  delRecipe,
};
