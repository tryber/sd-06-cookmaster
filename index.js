const express = require('express');
const bodyParser = require('body-parser');

const port = 3000;
const app = express();
const usersRouter = require('./Controllers/users');
const loginsRouter = require('./Controllers/login');

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
app.use(bodyParser.json());

app.use('/users', usersRouter);
app.use('/login', loginsRouter);

app.listen(port, () => console.log('pai ta on'));
