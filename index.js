const express = require('express');

const app = express();
const port = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

const bodyParser = require('body-parser');
const { UserRouter } = require('./controller/usersController');
const { LoginRouter } = require('./controller/loginController');

app.use(bodyParser.json());

app.use('/users', UserRouter);

app.use('/login', LoginRouter);

app.listen(port, () => console.log(`listening to ${port}`));
