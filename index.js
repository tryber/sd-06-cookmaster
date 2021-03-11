const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const UsersController = require('./controllers/UsersController');
const LoginController = require('./controllers/LoginController');
const RecipesController = require('./controllers/RecipesController');

const app = express();
const LOCALHOST_PORT = 3000;
const PORT = process.env.PORT || LOCALHOST_PORT;

app.use(bodyParser.json());
app.use('/images', express.static(path.join(__dirname, 'uploads')));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/ping', (request, response) => {
  response.status(200).send('pong!');
});

app.use('/users', UsersController);
app.use('/login', LoginController);
app.use('/recipes', RecipesController);

app.use((error, request, response, _next) => {
  response.status(error.code).json(error.errorMessage);
});

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
