const { Router } = require('express');
const { createUserService } = require('./userService');
const { validateUser } = require('../Middlewares/validation');

const router = Router();
const CREATED = 201;
// const SUCCESS = 200;
// const UNPROCESSABLE = 422;

router.post('/', validateUser, async (req, res) => {
  // const newUser = req.body;
  const { name, email, password } = req.body;
  const newUser = await createUserService(name, email, password);
  res.status(CREATED).json({ user: newUser });
});

module.exports = router;
