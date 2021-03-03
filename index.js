const express = require('express');
const bodyParser = require('body-parser');
// const path = require('path');
const { users, login } = require('./controller');
require('dotenv').config();

const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/users', users);
app.use('/login', login);
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Simbora na porta ${PORT}`);
});
