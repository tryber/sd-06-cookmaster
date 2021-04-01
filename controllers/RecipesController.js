const { Router } = require('express');
const { ObjectId } = require('mongodb');
const multer = require('multer');
const { verifyAuthorization, getPayload } = require('../middlewares/verifyAuthorization');
const Recipes = require('../models/Recipes');

const router = Router();

const SUCCESS = 200;
const SUCCESS201 = 201;
const SUCCESS204 = 204;
const ERRO400 = 400;
const ERRO404 = 404;

const smsInvalidEntries = { message: 'Invalid entries. Try again.' };

router.get('/', async (_req, res) => {
  const user = await Recipes.getAll();

  res.status(SUCCESS).json(user);
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
    userId: getPayload() && getPayload().userId,
  };
  
  res.status(SUCCESS201).json({ recipe });
});

// 5
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) { return res.status(ERRO404).json({ message: 'recipe not found' }); }
  const recipe = await Recipes.getById(id);

  if (!recipe) {
    return res.status(ERRO404).json({ message: 'recipe not found' }); 
}
  return res.status(SUCCESS).json(recipe);
});
// 5

// 7
router.put('/:id', verifyAuthorization, async (req, res) => {
  const { id } = req.params;
  const { name, ingredients, preparation } = req.body;
  
  const recipe = await Recipes.update(id, name, ingredients, preparation);
  
  return res.status(SUCCESS).json(recipe.value);
});
// 7

// 8
router.delete('/:id', verifyAuthorization, async (req, res) => {
  const { id } = req.params;
  const recipe = await Recipes.remove(id);

  return res.status(SUCCESS204).json(recipe.value);
});
// 8

// 9 e 10
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
  filename: (req, file, callback) => {
    const { id } = req.params;
    callback(null, `${id}.jpeg`);
  },
});

const upload = multer({ storage });

router.put('/:id/image', verifyAuthorization, upload.single('image'), async (req, res) => {
  const { id } = req.params;

  const { name, ingredients, preparation } = req.body;
  const recipe = {
    id,
    name,
    ingredients,
    preparation,
    userId: getPayload() && getPayload().userId,
    image: `localhost:3000/images/${ObjectId(id)}.jpeg`,
  };
  res.status(SUCCESS).json(recipe);
});
// 9 e 10

module.exports = router;