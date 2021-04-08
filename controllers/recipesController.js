const { Router } = require('express');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const { recipesValidation, validateToken, validateID } = require('../middlewares/Recipes');
const { getAllService, createService, addImgService,
  getIdService, editService, deleteService } = require('../services/recipesService');

const routerRecipes = Router();

const secret = 'senha12345';

const SUCCESS = 200;
const CREATE = 201;
const NO_CONTENT = 204;

const storage = multer.diskStorage({
  dest: './uploads',
  filename: (req, file, callback) => {
    callback(null, `${req.params.id}.jpeg`);
  },
});

const upload = multer({
  storage,
});

routerRecipes.get('/', async (_req, res) => {
  const getAll = await getAllService();
  return res.status(SUCCESS).json(getAll);
});

routerRecipes.post('/', recipesValidation, validateToken, async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const token = req.headers.authorization;

  const payload = jwt.verify(token, secret, {
    iss: 'Cookmaster',
    aud: 'identity',
  });

  const { _id: userID } = payload.userData;
  const recipeCreate = await createService(name, ingredients, preparation, userID);
  return res.status(CREATE).json({ recipe: recipeCreate });
});

routerRecipes.get('/:id', validateID, async (req, res) => {
  const { id } = req.params;
  const getId = await getIdService(id);
  return res.status(SUCCESS).json(getId);
});

routerRecipes.put('/:id', validateToken, async (req, res) => {
  const { id } = req.params;
  const { name, ingredients, preparation } = req.body;
  const recipeEdited = await editService(id, name, ingredients, preparation);
  return res.status(SUCCESS).json(recipeEdited);
});

routerRecipes.delete('/:id', validateToken, async (req, res) => {
  const { id } = req.params;
  await deleteService(id);
  return res.status(NO_CONTENT).send();
});

routerRecipes.put('/:id/image', validateToken, upload.single('image'), async (req, res) => {
  const { id } = req.params;
  const pathImage = `localhost:3000/images/${id}.jpeg`;
  await addImgService(id, pathImage);
  const recipeID = await getIdService(id);
  res.status(SUCCESS).json(recipeID);
});

module.exports = routerRecipes;
