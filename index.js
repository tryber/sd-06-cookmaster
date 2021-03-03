const express = require('express');
const bodyParser = require('body-parser');
const userController = require('./controller/userController');

const app = express();
const PORT = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use(bodyParser.json());
app.use('/users', userController);
// app.use('/login');
//  app.use();

app.listen(PORT, () => console.log('App listening on PORT %s', PORT));