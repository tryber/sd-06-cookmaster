const express = require('express');
const bodyParser = require('body-parser');
const {
  validations,
  validationsLogin,
  createUser,
  getUsers,
  auth,
  createRecipes,
  validationsRecipes,
  getRecipes,
  getRecipe,
  editRecipe,
  authValidate,
  deleteRecipe,
} = require('./src/controllers/index');

const app = express();
const recipeId = '/recipes/:id';
const PORT = 3000;

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.get('/users', getUsers);

app.post('/users', validations, createUser);

app.post('/login', validationsLogin, auth);

app.post('/recipes', validationsRecipes, createRecipes);

app.get(recipeId, getRecipe);

app.put(recipeId, authValidate, editRecipe);

app.delete(recipeId, authValidate, deleteRecipe);

app.get('/recipes', getRecipes);

app.listen(PORT, () => console.log(`rodando na porta ${PORT}`));