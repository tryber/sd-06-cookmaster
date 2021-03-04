const testeRouter = require('express').Router();

const { validateName } = require('../middlewares/validations');
const Model = require('../models/userModel');

testeRouter.get('/', (req, res) => res.status(200).send('ta no routerUser'));

testeRouter.post('/', validateName, async (req, res, next) => {
  try {
    const { name } = req.body;
  const user = await Model.createUser(name);
  if (!user) return res.status(400).json({ message: 'erro' });
  console.log(user);
  res.status(200).json({ message: 'sera' });
  } catch (error) {
    next({
      statusCode: 500,
      customMessage: 'Crashou no banco',
      error,
    });
  }
});

module.exports = testeRouter;