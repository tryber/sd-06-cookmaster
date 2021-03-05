const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { login, userController, recipesController } = require('./controllers');
const { error } = require('./middlewares');
const { verifyAuthorization } = require('./middlewares/verifyAuthorization');

const app = express();
app.use(bodyParser.json());

// /images é o caminho da API onde as imagens estarão disponíveis
// path.join(__dirname, 'uploads') é o caminho da pasta onde o multer salva suas imagens ao realizar o upload
app.use('/images', express.static(path.join(__dirname, 'uploads')));

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

// user
app.post('/login', login.login);
app.get('/users', userController.getAll);
app.post('/users', userController.create);

// recipes
app.get('/recipes', recipesController.getAll);
app.post('/recipes', verifyAuthorization, recipesController.create);

app.use(error);
