const express = require('express');
const bodyParser = require('body-parser');

const expectedError = require('./Middlewares/expectedError');
const usersController = require('./Controllers/usersController');
const recipesController = require('./Controllers/recipesController');
const usersLogin = require('./Controllers/usersLogin');
const { validateEntriesLogin,
    validateEmailLogin, validatePasswordLogin } = require('./Middlewares/usersValidators');

const app = express();
const bell = 3000;
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/users', usersController);
app.use('/recipes', recipesController);
// Requisito-2
app.post('/login', validateEntriesLogin, validateEmailLogin,
validatePasswordLogin, usersLogin);

app.use(expectedError);
app.listen(bell, () => console.log(`For whom the ${bell} tolls!`));
