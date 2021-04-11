const express = require('express');

const path = require('path');

const usersRouter = require('./users/usersRouter');

const loginController = require('./login/loginController');

const recipesRouter = require('./recipes/recipesRouter');

const app = express();

app.use(express.json());

const PORT = 3000;

app.use('/users', usersRouter);

app.use('/login', loginController);

app.use('/recipes', recipesRouter);

app.use('/images', express.static(path.join(__dirname, 'images')));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.listen(PORT, () => console.log('Esperando requisições na porta', PORT));
