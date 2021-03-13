const express = require('express');
const bodyParser = require('body-parser');
const userController = require('./controllers/userController');
const loginController = require('./controllers/loginController');
const recipesController = require('./controllers/recipesController');

const app = express();

const PORT = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use(bodyParser.json());

app.use('/users', userController);
app.use('/login', loginController);
app.use('/recipes', recipesController);

app.listen(PORT);
