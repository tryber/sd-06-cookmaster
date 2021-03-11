const express = require('express');
const bodyParser = require('body-parser');
const UsersController = require('./src/controllers/UsersController');
const LoginController = require('./src/controllers/LoginController');
const RecipesController = require('./src/controllers/RecipesController');

const app = express();

const PORT = 3000;

app.use(bodyParser.json());
app.use('/users', UsersController);
app.use('/login', LoginController);
app.use('/recipes', RecipesController);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(PORT, () => console.log(`Ouvindo na porta ${PORT}!`));
