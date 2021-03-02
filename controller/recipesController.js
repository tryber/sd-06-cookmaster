const { Router } = require('express');
const { getUserByEmail } = require('../services/loginServices');
const { validateToken, validateRecipe, createNewRecipe } = require('../services/recipesServices');

const RecipesRouter = new Router();

const twoHundredOne = 201;

RecipesRouter.get('/', async (req, res) => res.status(200).json('Recipes Router'));

// 3 - Crie um endpoint para o cadastro de receitas
// A receita só pode ser criada caso o usuário esteja logado e o token JWT validado.
RecipesRouter.post('/', validateToken, validateRecipe, async (req, res) => {
  const { email } = req.user;
  const user = await getUserByEmail(email);
  const { _id } = user;
  const recipe = {
    ...req.body,
    userId: _id,
  };

  await createNewRecipe(req.body);

  return res.status(twoHundredOne).json({ recipe });
});

module.exports = { RecipesRouter }; 
