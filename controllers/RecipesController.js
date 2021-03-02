const { Router } = require('express');
const verifyAuthorization = require('../middlewares/verifyAuthorization');
const Recipes = require('../models/Recipes');

const router = Router();

const SUCCESS = 200;
const SUCCESS201 = 201;
const ERRO400 = 400;

const smsInvalidEntries = { message: 'Invalid entries. Try again.' };

router.get('/', async (_req, res) => {
  const user = await Recipes.getAll();

  res.status(SUCCESS).json({ user });
});

const validation = async (name, ingredients, preparation) => {
  if (!name) {
    return smsInvalidEntries;
  } // Será validado que não é possível cadastrar receita sem o campo "name"
  
  if (!ingredients) {
    return smsInvalidEntries;
  } // Será validado que não é possível cadastrar receita sem o campo "ingredients"
  
  if (!preparation) {
    return smsInvalidEntries;
  } // Será validado que não é possível cadastrar receita sem o campo "preparation"

  return null;
};

router.post('/', verifyAuthorization, async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  // 
  const err = await validation(name, ingredients, preparation);
  if (err) return res.status(ERRO400).json(err);
  //

  const { insertedId } = await Recipes.create(name, ingredients, preparation);
  const recipe = {
    _id: insertedId,
    name,
    ingredients,
    preparation,
  };
  
  res.status(SUCCESS201).json({ recipe });
});

module.exports = router;