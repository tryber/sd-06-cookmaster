const { Router } = require('express');
const { getUserByEmail } = require('../services/loginServices');
const {
  validateToken,
  validateRecipe,
  createNewRecipe,
  getRecipes,
} = require('../services/recipesServices');

const RecipesRouter = new Router();

const code201 = 201;

// 4 - Crie um endpoint para a listagem de receitas
// Será validado que é possível listar todas as receitas sem estar autenticado
// Será validado que é possível listar todas as receitas estando autenticado
// O resultado retornado para listar receitas com sucesso deverá ser
// conforme exibido abaixo, com um status http 200

RecipesRouter.get('/', async (req, res) => {
  const allRecipes = await getRecipes();
  return res.status(200).json(allRecipes);
});

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

  return res.status(code201).json({ recipe });
});

module.exports = { RecipesRouter }; 
