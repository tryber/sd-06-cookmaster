const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const UsersController = require('./src/controllers/UsersController');
const RecipesController = require('./src/controllers/RecipesController');
const LoginController = require('./src/controllers/LoginController');

const app = express();

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

// ________________________________________________________

app.use(bodyParser.json());

app.use('/users', UsersController);

app.use('/login', LoginController);

app.use('/recipes', RecipesController);

// Requisito 10 (?)
app.use('/images', express.static(path.join(__dirname, 'uploads')));

// ________________________________________________________

const PORT = 3000;

app.listen(PORT, () => console.log('Server is running!'));
