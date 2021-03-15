const express = require('express');
const bodyParser = require('body-parser');

const path = require('path');
const usersController = require('./controllers/usersController');
const loginController = require('./controllers/loginController');
const recipesController = require('./controllers/recipesController');
const checkRequestBody = require('./middlewares/checkRequestBody');

const app = express();

const PORT = 3000;

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

// Requisito 01
app.use('/users', checkRequestBody, usersController);

// Requisito 02
app.use('/login', loginController);

// Requisito 03 em diante
app.use('/recipes', recipesController);

// Requisito 10
app.use('/images', express.static(path.join(__dirname, 'uploads')));

app.listen(PORT, () => console.log('Server has been started'));
