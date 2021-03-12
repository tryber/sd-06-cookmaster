const express = require('express');
const bodyParser = require('body-parser');
const controllerUsers = require('./controller/controllerUsers');
const controllerLogin = require('./controller/controllerLogin');
const controllerRecipes = require('./controller/controllerRecipes');

const DOOR = 3000;

const app = express();
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/users', controllerUsers);

app.use('/login', controllerLogin);

app.use('/recipes', controllerRecipes);

app.listen(DOOR, () => {
  console.log('Server Running');
});