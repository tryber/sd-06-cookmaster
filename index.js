const express = require('express');
const bodyParser = require('body-parser');
const UsersController = require('./controllers/UsersController');
const LoginController = require('./controllers/LoginController');
const RecipesController = require('./controllers/RecipesController');
const verifyAuthorization = require('./middlewares/verifyAuthorization');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use('/users', UsersController);
app.use('/login', LoginController);
app.use('/recipes', verifyAuthorization, RecipesController);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.listen(PORT, () => console.log(`Servidor rodando liso na porta ${PORT}`));
