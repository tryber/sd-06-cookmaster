const express = require('express');
const LoginController = require('./controllers/loginController');
const UserController = require('./controllers/userController');
const RecipeController = require('./controllers/recipeController');

const app = express();

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

const PORT = 3000;

app.use(express.json());

app.use('/users', UserController);
app.use('/login', LoginController);
app.use('/recipes', RecipeController);

app.listen(PORT);
