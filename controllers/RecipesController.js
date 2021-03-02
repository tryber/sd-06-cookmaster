const express = require('express');
const { Router } = require('express');
const multer = require('multer');
const Recipes = require('../services/RecipesServices');
const verifyAuthorization = require('../middlewares/verifyAuthorization');
const validateUser = require('../Auth/validateUser');

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images/');
  },
  filename: (req, file, callback) => {
    callback(null, `${req.params.id}.jpeg`);
  },
});

const upload = multer({ storage });

const RecipesRouter = Router();

const NOT_FOUND = 'Não Encontrado';

const validateForm = ({ name, ingredients, preparation }) => {
  if (!name || !ingredients || !preparation) throw new Error('Invalid entries. Try again.');
};

RecipesRouter.use(express.static(`${__dirname}/uploads`));

RecipesRouter.get('/', async (req, res) => {
  try {
    const data = await Recipes.getAll();
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

RecipesRouter.get('/:id', async (req, res) => {
  try {
    const data = await Recipes.getById(req.params.id);
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json({ message: 'recipe not found' });
  }
});

RecipesRouter.post('/', verifyAuthorization, async (req, res) => {
  try {
    await validateForm(req.body);
    const data = await Recipes.add(req.headers.authorization, req.body);
    res.status(201).json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

RecipesRouter.put('/:id', verifyAuthorization, async (req, res) => {
  try {
    const { userId } = await Recipes.getById(req.params.id);
    await validateUser(req.headers.authorization, userId);
    const { name, ingredients, preparation } = req.body;
    const data = await Recipes.update(req.params.id, name, ingredients, preparation);
    res.status(200).json({ ...data, userId });
  } catch (error) {
    res.status(404).json({ message: NOT_FOUND });
  }
});

RecipesRouter.delete('/:id', verifyAuthorization, async (req, res) => {
  try {
    const { userId } = await Recipes.getById(req.params.id);
    await validateUser(req.headers.authorization, userId);
    const data = await Recipes.remove(req.params.id);
    res.status(204).json(data);
  } catch (error) {
    res.status(404).json({ message: NOT_FOUND });
  }
});

RecipesRouter.put('/:id/image/', upload.single('image'), async (req, res) => {
  try {
    const { userId } = await Recipes.getById(req.params.id);
    await validateUser(req.headers.authorization, userId);
    const data = await Recipes.addImage(req.params.id, req.file.path);
    res.status(200).json(data);
  } catch (error) {
    res.status(401).json({ message: 'missing auth token' });
  }
});

module.exports = RecipesRouter;
