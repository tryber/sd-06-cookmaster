const express = require('express');
const bodyParser = require('body-parser');

const UsersController = require('./controllers/userController');
const LoginController = require('./controllers/loginController');
const RecipesController = require('./controllers/recipeController');
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

app.listen(PORT, () => console.log('listening on 3000'));