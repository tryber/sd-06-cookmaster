const bodyParser = require('body-parser');
const express = require('express');
require('express-async-errors');
const usersRouter = require('./routes/UsersRoutes');
const handleError = require('./middlewares/handleError');
const loginRouter = require('./routes/LoginRouter');

const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/users', usersRouter);

app.use('/login', loginRouter);

app.use(handleError);

const SERVER_PORT = 3000;

app.listen(SERVER_PORT);
