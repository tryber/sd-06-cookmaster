const express = require('express');
const bodyParser = require('body-parser');
const UsersController = require('./controllers/UsersController');
const LoginController = require('./controllers/LoginController');
const RecipesController = require('./controllers/RecipesController');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use('/users', UsersController);
app.use('/login', LoginController);
app.use('/recipes', RecipesController);
app.use('/images', express.static(__dirname.concat('/images')));

app.use((err, _request, response, _next) => response.status(500).json({ err }));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.listen(PORT, () => console.log(`Servidor rodando liso na porta ${PORT}`));
