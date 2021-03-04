const express = require('express');

const bodyParser = require('body-parser');
const userController = require('./controllers/userController');
const loginConroller = require('./controllers/loginController');

const log = require('./middlewares/logger');
const error = require('./middlewares/error');

const app = express();

const PORT = 3000;

app.use(bodyParser.json());
app.use(log);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/users', userController);

app.use('/login', loginConroller);

app.all('*', (_req, res) => res.status(404).json({ message: 'Endpoint não existe' }));

app.use(error);

app.listen(PORT, () => {
  console.log(`Rodando na porta ${PORT}`);
});