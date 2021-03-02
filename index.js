const express = require('express');
const bodyParser = require('body-parser');
const usersRouter = require('./src/controllers/UsersController');
const error = require('./src/middlewares/error');
const userLogin = require('./src/middlewares/Login');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/users', usersRouter);

app.post('/login', userLogin);

app.use(error);

app.listen(port, () => console.log('Example app listening on port port!'));
