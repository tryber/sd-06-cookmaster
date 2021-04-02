const express = require('express');

const usersRouter = require('./users/usersRouter');

const loginController = require('./login/loginController');

const app = express();

app.use(express.json());

const PORT = 3000;

app.use('/users', usersRouter);

app.use('/login', loginController);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.listen(PORT, () => console.log('Esperando requisições na porta', PORT));
