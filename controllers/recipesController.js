const { Router } = require('express');

const router = Router();
const recipesService = require('../services/recipesService');
const { verifyAuthorization } = require('../auth/verifyAuthotization');

const status201 = 201;
const status200 = 200;
const status401 = 401;

router.post('/', verifyAuthorization, async (req, res) => {
  const { name, ingredients, preparation, userId } = req.body;

  const result = await recipesService.create(name, ingredients, preparation, userId);

  if (result.err) return res.status(result.err.status).json({ message: result.err.message });

  return res.status(status201).json(result);
});

router.get('/', async (req, res) => {
  const result = await recipesService.getAll();

  if (result) res.status(status200).json(result);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  const result = await recipesService.getById(id);

  if (result.err) return res.status(result.err.code).json({ message: result.err.message });

  return res.status(status200).json(result);
});

router.put('/:id', verifyAuthorization, async (req, res) => {
  const { id } = req.params;
  const { name, ingredients, preparation } = req.body;

  const result = await recipesService.update(id, name, ingredients, preparation);

  if (result.err) return res.status(status401).json({ message: result.err.message });

  return res.status(status200).json(result);
});

module.exports = router;
