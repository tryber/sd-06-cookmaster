const express = require('express');
const userController = require('./controllers/usersController');

const app = express();

app.use(express.json()); // body-parser em desuso
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/users', userController);

const PORT = 3000;
app.listen(PORT, () => console.log(`Em nome de Jesus tá executando na ${PORT}`));
