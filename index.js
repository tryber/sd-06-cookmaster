const bodyParser = require('body-parser');
const express = require('express');
const usersRouter = require('./routes/UsersRoutes');
const handleError = require('./middlewares/handleError');

const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use(usersRouter);

app.use(handleError);

const SERVER_PORT = 3000;

app.listen(SERVER_PORT);
