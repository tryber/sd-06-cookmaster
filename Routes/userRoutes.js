const { Router } = require('express');
const controllers = require('../Controllers/userControllers');

const CREATED = 201;
const router = new Router();

router.post('/', async (req, res) => {
  const { name, email, password } = req.body;

  const newUser = await controllers.create(name, email, password);

  if (newUser.code) {
    return res.status(newUser.code).send({ message: newUser.message });
  }

  return res.status(CREATED).json(newUser);
});

module.exports = router;
