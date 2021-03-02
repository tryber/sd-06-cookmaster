const express = require('express');
const bodyParser = require('body-parser');

const path = require('path');

const usersController = require('./controllers/usersController');
const recipesController = require('./controllers/recipesController');
const loginController = require('./controllers/loginController');

const app = express();

app.use('/images', express.static(path.join(__dirname, '/images')));

const PORT = 3000;

app.use(bodyParser.json());

app.use('/users', usersController);
app.use('/recipes', recipesController);
app.use('/login', loginController);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.listen(PORT, () => console.log('Rodando na 3k!'));
