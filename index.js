const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const UsersController = require('./controllers/UsersController');
const LoginController = require('./controllers/LoginController');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// path.join(__dirname, 'uploads') é o caminho da pasta onde o multer salva suas imagens ao realizar o upload
app.use('/images', express.static(path.join(__dirname, 'uploads')));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/users', UsersController);

app.use('/login', LoginController);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
