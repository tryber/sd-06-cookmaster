const { Router } = require('express');

const router = Router();
const userService = require('../services/userService');

const status201 = 201;

router.post('/', async (req, res) => {
  const { name, email, password } = req.body;

  const result = await userService.create(name, email, password);

  if (result.err) return res.status(result.err.status).json({ message: result.err.message });

  return res.status(status201).json(result);
});

module.exports = router;
