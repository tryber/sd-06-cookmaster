const express = require('express');
const bodyParser = require('body-parser');
// const path = require('path');
const { users } = require('./controller');
const { loginRouter } = require('./controller/login');
const { recipeRouter } = require('./controller/recipesController');
const { handleErrors } = require('./middlewares');
require('dotenv').config();

const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/users', users);
app.use('/login', loginRouter);
app.use('/recipes', recipeRouter);
app.use(handleErrors);
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Simbora na porta ${PORT}`);
});
