const express = require('express');
require('express-async-errors');
const bodyParser = require('body-parser');
const userController = require('./api/controllers/userController');
const loginConroller = require('./api/controllers/loginController');
const recipeController = require('./api/controllers/recipeController');
// const validateJWT = require('./api/auth/validateJWT');

const log = require('./api/middlewares/logger');
const error = require('./api/middlewares/error');

const app = express();

const PORT = 3000;

app.use(bodyParser.json());
app.use(log);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/users', userController);

app.use('/login', loginConroller);

app.use('/recipes', recipeController);

app.all('*', (_req, res) => res.status(404).json({ message: 'Endpoint não existe' }));

app.use(error);

app.listen(PORT, () => {
  console.log(`Rodando na porta ${PORT}`);
});
