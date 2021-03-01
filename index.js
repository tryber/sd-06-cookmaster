const express = require('express');
const bodyParser = require('body-parser');

const userController = require('./Controller/usersController');
const serviceValidations = require('./Services/serviceValidations');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

// users rotas
app.post('/users', serviceValidations.createValidations, userController.create);

app.listen(PORT, () => console.log(`Ouvindo a porta ${PORT}`));
