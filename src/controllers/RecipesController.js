const { Router } = require('express');
const rescue = require('express-rescue');
// const Users = require('../models/Users');
const multer = require('multer');
const Recipes = require('../models/Recipes');
const validateJWT = require('../auth/validateJWT');

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, './uploads');
  },
  filename: (req, file, callback) => {
    // const fileType = file.originalname.split('.')[1];
    const filename = `${req.params.id}.jpeg`;
    callback(null, filename);
  },
});

const upload = multer({ storage });
const router = Router();

router.put('/:id/image/', validateJWT, upload.single('image'), rescue(async (req, res) => {
  const { id } = req.params;
  const { filename } = req.file;
  
  const recipe = await Recipes.addImage(filename, id);
  
  return res.status(200).json(recipe);
}));

router.get('/images/:id.jpeg', rescue(async (req, res) => {
  const { id } = req.params;
  
  res.sendFile(`uploads/${id}.jpeg`, { root: '.' });
}));

router.get('/', rescue(async (req, res) => {
  const recipes = await Recipes.getAll();
  
  return res.status(200).json(recipes);
}));

router.get('/:id', rescue(async (req, res) => {
  const { id } = req.params;
  if (id.length !== 24) return res.status(404).json({ message: 'recipe not found' });
  
  const recipe = await Recipes.findById(id);
  if (!recipe || id.length !== 24) return res.status(404).json({ message: 'recipe not found' });
  
  return res.status(200).json(recipe);
}));

router.post('/', validateJWT, rescue(async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  if (!name || !ingredients || !preparation) {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }
  const { _id } = req.user;
  
  const recipe = await Recipes.create(name, ingredients, preparation, _id);
    
  // Não coloquei URL da imagem!
  return res.status(201).json({ recipe });
}));

router.put('/:id', validateJWT, rescue(async (req, res) => {
  if (!req.headers.authorization) return res.status(401).json({ message: 'missing auth token' });
  
  const recipe = await Recipes.findById(req.params.id);
  if (!recipe) return res.status(404).json({ message: 'recipe doesn\'t exist' });
  
  const { name, ingredients, preparation } = req.body;
  const { _id } = req.user; // usuário autenticado
  const { userId } = recipe; // usuário que criou a receita
  
  // o usuário que está autenticado no sistema é o mesmo que criou a receita?
  const userIsValid = (userId.toString() === _id.toString()) || req.user.role === 'admin';
  
  if (userIsValid) {
    const updatedRecipe = await Recipes.update(name, ingredients, preparation, recipe);
    
    return res.status(200).json(updatedRecipe);
  }
  res.status(401).json({ message: 'missing auth token' });
}));

router.delete('/:id', validateJWT, rescue(async (req, res) => {
  const recipe = await Recipes.findById(req.params.id);
  const { _id } = req.user; // usuário autenticado
  const { userId } = recipe; // usuário que criou a receita

  // o usuário que está autenticado no sistema é o mesmo que criou a receita?
  const userIsValid = (userId.toString() === _id.toString()) || req.user.role === 'admin';
  
  if (userIsValid) {
    const { _id: recipeId } = recipe;
    await Recipes.remove(recipeId);
    
    return res.status(204).json();
  }
  res.status(500).json({ message: 'wrong user' });
}));

module.exports = router;
