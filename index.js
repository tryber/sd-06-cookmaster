const express = require('express');

const app = express();
const port = 3000;

const bodyParser = require('body-parser');
const UsersController = require('./controllers/UsersController');
const LoginController = require('./controllers/LoginController');

app.use(bodyParser.json());
app.use('/login', LoginController);
app.use('/users', UsersController);
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
