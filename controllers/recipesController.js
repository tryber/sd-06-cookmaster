const { Router } = require('express');

const tokenValidate = require('../middlewares/tokenValidate');
const recipeValidate = require('../middlewares/recipeValidate');
const privilegeValidate = require('../middlewares/privilegeValidate');
const { createRecipe, getAllRecipes, getRecipeById,
  editRecipe, recipeDelete } = require('../services/userServices');

const CREATE = 201;
const DFTERROR = 400;
const OK = 200;
const NOTFOUND = 404;

const router = Router();

router.post('/', tokenValidate, recipeValidate, async (req, res) => {
  try {
    const { name, ingredients, preparation } = req.body;
    const { _id } = req.user;

    const recipe = await createRecipe({ name, ingredients, preparation, userId: _id });
    return res.status(CREATE).send(recipe);
  } catch (err) {
    console.log(err);
    return res.status(DFTERROR).send(err);
  }
});

router.get('/', async (req, res) => {
  try {
    const recipes = await getAllRecipes();
    res.status(OK).send(recipes);
  } catch (err) {
    console.log(err);
    res.status(DFTERROR).send(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const recipe = await getRecipeById(id);

    if (!recipe) { 
      return res.status(NOTFOUND)
      .send({ message: 'recipe not found' });
  }

    return res.status(OK).send(recipe);
  } catch (err) {
    console.log(err);
    res.status(DFTERROR).send(err);
  }
});

router.put('/:id', tokenValidate, privilegeValidate, async (req, res) => {
  try {
    const { name, ingredients, preparation } = req.body;
    const { _id } = req.recipe;
    const recipeEdited = await editRecipe({ name, ingredients, preparation, _id });

    return res.status(OK).send(recipeEdited);
  } catch (err) {
    console.log(err);
    res.status(DFTERROR).send(err);
  }
});

router.delete('/:id', tokenValidate, privilegeValidate, async (req, res) => {
  try {
    const NOCONTENT = 204;
    await recipeDelete();
    res.status(NOCONTENT).send();
  } catch (err) {
    console.log(err);
    res.status(DFTERROR).send(err);    
  }
});

module.exports = router;