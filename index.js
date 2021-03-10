const express = require('express');
const bodyParser = require('body-parser');

const users = require('./src/controller/userController');

const app = express();

const port = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

// const { products } = require('./src/controller/products');
// const { sales } = require('./src/controller/sales');
app.use(bodyParser.json());
app.use('/', users);
// app.use('/', sales);

app.listen(port, () => {
  console.log(`Ouvindo na porta ${port}`);
});