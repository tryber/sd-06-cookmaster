const express = require('express');

const app = express();

const port = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

const bodyParser = require('body-parser');
const { UsersRouter } = require('./controller/usersController');
const { LoginRouter } = require('./controller/loginController');

app.use(bodyParser.json());

// 1 - Crie um endpoint para o cadastro de usuários
// A rota deve ser (/users).
app.use('/users', UsersRouter);

// 2 - Crie um endpoint para o login de usuários
// A rota deve ser (/login).
app.use('/login', LoginRouter);

app.listen(port, () => console.log(`Listening to ${port}`));
