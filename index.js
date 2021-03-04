const express = require('express');

const app = express();
const PORT = 3000;
const ERROR = 500;

const UsersController = require('./src/controllers/UsersController');
const LoginController = require('./src/controllers/LoginController');
const RecipesController = require('./src/controllers/RecipesController');

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
// nao remova o endpoint acima

// deixando a imagem disponivel de volta com rota dinamica
app.use('/images', express.static(`${__dirname}/uploads`));

app.use('/users', UsersController);
app.use('/login', LoginController);
app.use('/recipes', RecipesController);

app.use((error, req, res, _next) => {
  console.log(error);
  return res.status(ERROR).json({ message: 'Erro Interno!' });
});

app.listen(PORT, () => console.log('Example app listening on port port!'));
