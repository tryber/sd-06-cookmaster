const express = require('express');

const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

const userController = require('./controllers/userController');
const login = require('./controllers/login');
const recipesController = require('./controllers/recipesController');

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/users', userController);
app.use('/login', login);
app.use('/recipes', recipesController);

app.listen(PORT, () => console.log('app listening!'));
