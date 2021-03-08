const express = require('express');
const bodyParser = require('body-parser');
const UsersController = require('./src/controllers/UsersController');

const app = express();

const PORT = 3000;

app.use(bodyParser.json());
app.use('/users', UsersController);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(PORT, () => console.log(`Ouvindo na porta ${PORT}!`));
