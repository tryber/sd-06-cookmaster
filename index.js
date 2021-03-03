const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const userController = require('./users/userController');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/images', express.static(path.join(__dirname, 'uploads')));

app.use('/user', userController);

app.listen(PORT, () => { console.log('Running...'); });
