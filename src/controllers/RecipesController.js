const { Router } = require('express');
const rescue = require('express-rescue');

const RecipesRouter = Router();
const bodyParser = require('body-parser');

RecipesRouter.use(bodyParser.json());

// services imports
const CreateRecipesService = require('../services/CreateRecipesService');
const GetAllRecipesService = require('../services/GetAllRecipesService');
const GetRecipesByIdService = require('../services/GetRecipesByIdService');
const UpdateRecipesByIdService = require('../services/UpdateRecipesByIdService');
const DeleteRecipesByIdService = require('../services/DeleteRecipesByIdService');
const UpdateRecipesWithImageService = require('../services/UpdateRecipesWithImageService');

// middleware imports
const verfifyAuthorization = require('../middlewares/verfifyAuthorization');
const verifyToken = require('../middlewares/verifyToken');
const validateName = require('../middlewares/validateName');
const validateToken = require('../auth/validateToken');
const validateIngredients = require('../middlewares/validateIngredients');
const validatePreparation = require('../middlewares/validatePreparation');
const validateRecipeId = require('../middlewares/validateRecipeId');
const resolveProblem = require('../middlewares/resolveProblem');

const CreateRecipes = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { authorization } = req.headers;

  const payload = validateToken(authorization);
  const { _id } = payload;
  const resp = await CreateRecipesService(name, ingredients, preparation, _id);

  return res.status(resp.status).json(resp.mensage);
};

const getAllRecipes = async (_req, res) => {
  const resp = await GetAllRecipesService();
  return res.status(resp.status).json(resp.recipesResponse);
};

const getRecipesById = async (req, res) => {
  const { id } = req.params;
  const resp = await GetRecipesByIdService(id);
  return res.status(resp.status).json(resp.recipesResponse);
};

const updateRecipesById = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { id } = req.params;

  const resp = await UpdateRecipesByIdService(id, name, ingredients, preparation);
  return res.status(resp.status).json(resp.recipesResponse);
};

const deleteRecipesById = async (req, res) => {
  const { id } = req.params;
  const resp = await DeleteRecipesByIdService(id);
  return res.status(resp.status).json();
};

// multer
const UploadSingle = require('../middlewares/uploadSingle');

const uploadImage = async (req, res) => {
  const { id } = req.params;

  const resp = await UpdateRecipesWithImageService(id);
  return res.status(resp.status).json(resp.recipesResponse);
};
// end multer

RecipesRouter.post(
  '/', validateName, validateIngredients, validatePreparation, verfifyAuthorization, rescue(
    CreateRecipes,
    ),
);
RecipesRouter.get('/', rescue(getAllRecipes));

RecipesRouter.put(
  '/:id/image/',
  resolveProblem,
  validateRecipeId,
  verifyToken,
  verfifyAuthorization,
  UploadSingle,
  rescue(uploadImage),
);
// end multer

RecipesRouter.get('/:id', resolveProblem, validateRecipeId, rescue(getRecipesById));
RecipesRouter.put(
  '/:id',
  resolveProblem,
  verifyToken,
  verfifyAuthorization,
  rescue(updateRecipesById),
);
RecipesRouter.delete(
  '/:id', resolveProblem,
  verifyToken, verfifyAuthorization,
  rescue(deleteRecipesById),
);

module.exports = RecipesRouter;
