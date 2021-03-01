const express = require('express');

const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

const userController = require('./controllers/userController');

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/users', userController);

app.listen(PORT, () => console.log('app listening!'));
