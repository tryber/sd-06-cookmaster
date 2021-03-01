const express = require('express');
const bodyParser = require('body-parser');
const UsersController = require('./controllers/UsersController');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use('/users', UsersController);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.listen(PORT, () => console.log(`Servidor rodando liso na porta ${PORT}`));
