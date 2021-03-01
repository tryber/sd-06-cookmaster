const express = require('express');

const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const unexpectedError = require('./middlewares/unexpectedError');
const UserController = require('./controllers/UserController');

app.use(bodyParser.json());

app.use('/', UserController);

app.get('/', (_request, response) => {
  response.send();
});

app.use(unexpectedError);

app.listen(port, () => console.log(`Example app listening on ${port}!`));
