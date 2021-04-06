const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const userController = require('./controller/userController');
const loginController = require('./controller/loginController');
const recipesController = require('./controller/recipesController');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.use('/users', userController);

app.use('/login', loginController);

app.use('/recipes', recipesController);

app.use('/images', express.static(path.join(__dirname, '/uploads')));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send('hello');
});

app.use((err, _req, res, _next) => {
  const { status, messageObject } = err;
  const statusAtual = status || 500;
  return res.status(statusAtual).json(messageObject);
});

app.listen(PORT, () => console.log('to na porta:', PORT));
