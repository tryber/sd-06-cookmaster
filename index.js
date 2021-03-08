const express = require('express');
const bodyParser = require('body-parser');
const UsersController = require('./src/controllers/UsersController');
const LoginController = require('./src/controllers/LoginController');
const { error } = require('./src/middlewares');

const app = express();

const PORT = 3000;

app.use(bodyParser.json());
app.use('/users', UsersController);
app.use('/login', LoginController);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use(error);

app.listen(PORT, () => console.log(`Ouvindo na porta ${PORT}!`));
