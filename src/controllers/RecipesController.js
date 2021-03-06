const { Router } = require('express');
const rescue = require('express-rescue');
// const Users = require('../models/Users');
const Recipes = require('../models/Recipes');
const validateJWT = require('../auth/validateJWT');

const router = Router();

function validateRecipe(req, res, next) {
  const { name, ingredients, preparation } = req.body;
  
  if (!name || !ingredients || !preparation) {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }
  
  next();
}

router.get('/', rescue(async (req, res) => {
  const recipes = await Recipes.getAll();
  
  return res.status(200).json(recipes);
}));

router.post('/', validateJWT, validateRecipe, rescue(async (req, res) => {
    const { name, ingredients, preparation } = req.body;
  const { _id } = req.user;
  
  const recipe = await Recipes.create(name, ingredients, preparation, _id);
    
  // Não coloquei URL da imagem!
  res.status(201).json({ recipe });
}));

module.exports = router;
