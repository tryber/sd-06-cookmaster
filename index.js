const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const userController = require('./src/controller/UserController');
const loginController = require('./src/controller/LoginController');
const recipesController = require('./src/controller/RecipesController');

const app = express();

const PORT = 3000;

app.use(bodyParser.json());
app.use('/images', express.static(path.join(__dirname, 'images')));

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/users', userController);
app.use('/login', loginController);
app.use('/recipes', recipesController);

app.listen(PORT, () => {
  console.log(`Api waiting for requests on port: ${PORT}`);
});
