const express = require('express');
const bodyParser = require('body-parser');
const UsersController = require('./controllers/UsersController');

const app = express();
const LOCALHOST_PORT = 3000;
const PORT = process.env.PORT || LOCALHOST_PORT;

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/ping', (request, response) => {
  response.status(200).send('pong!');
});

app.use('/users', UsersController);

app.use((error, request, response, _next) => {
  response.status(error.code).json(error.errorMessage);
});

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
