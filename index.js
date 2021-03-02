const express = require('express');
const bodyParser = require('body-parser');

const usersController = require('./src/controllers/usersController');
const recipesController = require('./src/controllers/recipesController');

const app = express();

const PORT = 3000;
const OK = 200;

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/', (_req, res) => {
  res.status(OK).json({ ok: true });
});

app.use('/users', usersController);

app.use('/recipes', recipesController);

app.listen(PORT, console.log(`App running on port ${PORT}`));
