const express = require('express');
const bodyParser = require('body-parser');
const {
  validations,
  validationsLogin,
  createUser,
  getUsers,
  auth,
} = require('./src/controllers/index');
// const Users = require('./src/service/index');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.get('/users', getUsers);

app.post('/users', validations, createUser);

app.post('/login', validationsLogin, auth);

app.listen(PORT, () => console.log(`rodando na porta ${PORT}`));