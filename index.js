const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const UsersController = require('./src/controllers/UsersController');
const LoginController = require('./src/controllers/LoginController');
const RecipesController = require('./src/controllers/RecipesController');

const app = express();

app.use(bodyParser.json());

// /images é o caminho da API onde as imagens estarão disponíveis
// path.join(__dirname, 'uploads') é o caminho da pasta onde o multer salva suas imagens ao realizar o upload
app.use('/images', express.static(path.join(__dirname, 'uploads')));

app.use('/users', UsersController);
app.use('/login', LoginController);
app.use('/recipes', RecipesController);

app.use((err, req, res, _next) => {
  if (err) console.log(err);
  res.status(500).json({ message: 'Erro interno' });
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send('ok');
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Listening on ${PORT}...`));