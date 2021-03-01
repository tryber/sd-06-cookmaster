const bodyParser = require('body-parser');
const express = require('express');
const userController = require('./Controller/usersController');

const app = express();
const PORT = 3000;

app.use(express.json())

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

// users rotas
app.post('/users', userController.create);


app.listen(PORT, () => console.log(`Ouvindo a porta ${PORT}`));
