require('dotenv').config();
require('express-async-errors');
const express = require('express');

const bodyParser = require('body-parser');
const userController = require('./controllers/userController');
const testeController = require('./controllers/testeController');
const log = require('./middlewares/logger');
const error = require('./middlewares/error');

const app = express();

const { PORT } = process.env;

app.use(bodyParser.json());
app.use(log);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.get('/teste', testeController);

app.use('/users', userController);

app.all('*', (_req, res) => res.status(404).json({ message: 'Endpoint não existe' }));

app.use(error);

app.listen(PORT, () => {
  console.log(`Rodando na porta ${PORT}`);
});