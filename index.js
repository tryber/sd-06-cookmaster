const express = require('express');
const bodyParser = require('body-parser');
// const { UsersController, LoginController, RecipesController } = require('./controllers');

const UsersController = require('./controllers/UsersController');
const LoginController = require('./controllers/LoginController');
const RecipesController = require('./controllers/RecipesController');
const ImagesController = require('./controllers/ImagesController');

const app = express();
const PORT = 3000;
app.use(bodyParser.json());

app.set('port', PORT);
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/recipes', RecipesController);

app.use('/users', UsersController);

app.use('/images', ImagesController);

app.use('/login', LoginController);

app.listen(PORT, () => console.log('i can heeeaaar yoooouuu 3000'));
