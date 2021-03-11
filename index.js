const express = require('express');

const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

const userController = require('./src/controllers/userController');
const login = require('./src/controllers/login');
const recipesController = require('./src/controllers/recipesController');

app.use(bodyParser.json());

app.get('/', (request, response) => {
  response.send();
});

app.use('/users', userController);
app.use('/login', login);
app.use('/recipes', recipesController);

app.listen(PORT, () => console.log('app listening!'));
