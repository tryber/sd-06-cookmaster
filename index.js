const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const userController = require('./src/controllers/userController');
const loginController = require('./src/controllers/loginController');
const recipesController = require('./src/controllers/recipesController');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use('/images', express.static(path.join(__dirname, 'uploads')));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/ping', (request, response) => {
  response.status(200).send('pong!');
});

app.use('/users', userController);
app.use('/login', loginController);
app.use('/recipes', recipesController);

app.use((error, request, response, _next) => {
  response.status(error.code).json(error.errorMessage);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
