const express = require('express');
const bodyParser = require('body-parser');
const userController = require('./src/controller/UserController');

const app = express();

const PORT = 3000;

app.use(bodyParser.json());

app.listen(PORT, () => {
  console.log(`Api waiting for requests on port: ${PORT}`);
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/users', userController);
