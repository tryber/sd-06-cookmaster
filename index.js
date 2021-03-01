const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
// path.join(__dirname, 'uploads') é o caminho da pasta onde o multer salva suas imagens ao realizar o upload
app.use('/images', express.static(path.join(__dirname, 'uploads')));

const app = express();

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
