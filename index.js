const express = require('express');
const bodyParser = require('body-parser');
// const path = require('path');
const { users } = require('./controller');

const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/users', users);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Simbora na porta ${PORT}`);
});
