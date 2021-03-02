const { Router } = require('express');

const router = Router();
const recipesService = require('../services/recipesService');
// const { verifyAuthorization } = require('../auth/verifyAuthotization'); verifyAuthorization

const status201 = 201;

router.post('/', async (req, res) => {
  const { name, ingredients, preparation } = req.body;

  const result = await recipesService.create(name, ingredients, preparation);

  if (result.err) return res.status(result.err.status).json({ message: result.err.message });

  return res.status(status201).json(result);
});

module.exports = router;
