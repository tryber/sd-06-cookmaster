const express = require('express');
const app = express();

const port = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

const bodyParser = require('body-parser');
const { UsersRouter } = require('./Controller/usersController');

app.use(bodyParser.json());

app.use('/users', UsersRouter)

app.listen(port, () => console.log(`Listening to ${port}`));
