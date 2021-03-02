const express = require('express');
const bodyParser = require('body-parser');
const routerUsers = require('./controllers/UsersController');
const routerLogin = require('./controllers/LoginController');
const routerRecipes = require('./controllers/RecipesController');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use('/users', routerUsers);
app.use('/login', routerLogin);
app.use('/recipes', routerRecipes);
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
response.send();
});

app.listen(PORT, () => console.log('Ouvindo porta 3000'));
