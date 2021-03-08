const express = require('express');
const bodyParser = require('body-parser');
const UsersController = require('./src/controllers/UsersController');
const LoginController = require('./src/controllers/LoginController');

const app = express();
const PORT = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use(bodyParser.json());

app.use('/users', UsersController);

app.use('/login', LoginController);

app.listen(PORT, () => console.log('App listening on PORT %s', PORT));