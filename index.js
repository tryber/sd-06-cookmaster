const express = require('express');
const bodyParser = require('body-parser');
const UsersRouter = require('./src/routes/UserRoutes');
const LoginRouter = require('./src/routes/LoginRoutes');
const { handleError } = require('./src/middlewares');

const app = express();
const port = 3000;

// Trybe Code
app.get('/', (request, response) => {
  response.send();
});

// My Code
app.use(bodyParser.json());

app.use('/users', UsersRouter);
app.use('/login', LoginRouter);
app.use(handleError);

app.listen(port, () => console.log('Port Running'));
