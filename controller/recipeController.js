const Router = require('express');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'uploads');
  },
  filename: (req, file, callback) => {
    const { id } = req.params;
    callback(null, `${id}.jpeg`);
  },
});
const upload = multer({ storage });
const {
  createRecipes,
  listRecipes,
  findById,
  updateRecipes,
  removeRecipe,
  addImageRecipe,
} = require('../service/recipeService');

const { checkAuthorization } = require('../midddleware/checkAutorization');
const checkId = require('../midddleware/chechId');
const checkItens = require('../midddleware/checkRecipes');

const recipeController = new Router();

recipeController.post('/', checkItens, checkAuthorization, async (req, res) => {
  const okay = 201;
  const { _id } = req.payload;
  const recipes = req.body;
  recipes.userId = _id;
  const create = await createRecipes(recipes);
  const { ops } = create;
  res.status(okay).json({ recipe: ops[0] });
});
recipeController.get('/', async (_req, res) => {
  const okay = 200;
  const find = await listRecipes();
  res.status(okay).json(find);
});
recipeController.get('/:id', checkId, async (req, res) => {
  const okay = 200;
  const { id } = req.params;
  const find = await findById(id);
  res.status(okay).json(find);
});
recipeController.put('/:id', checkId, checkAuthorization, async (req, res) => {
  const okay = 200;
  const { id } = req.params;
  const recipes = req.body;
  const find = await findById(id);
  const { userId } = find;
  recipes.userId = userId;
  const recipe = await updateRecipes(id, recipes);

  res.status(okay).json(recipe);
});
recipeController.delete('/:id', checkAuthorization, async (req, res) => {
  const NoContent = 204;
  const { id } = req.params;
  await removeRecipe(id);
  res.status(NoContent).end();
});
recipeController.put('/:id/image/',
  checkId, checkAuthorization, upload.single('image'), async (req, res) => {
    const { id } = req.params;
    const find = await findById(id);
    find.image = `localhost:3000/images/${id}.jpeg`;
    console.log(find);
    await addImageRecipe(id, find);
    res.status(200).json(find);
  });

module.exports = recipeController;