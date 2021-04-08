const express = require('express');
const { json } = require('body-parser');
const path = require('path');

const users = require('./controllers/users.js');
const login = require('./controllers/login');
const recipes = require('./controllers/recipes');

const app = express();
const PORT = 3000;

app.use(json());
app.use('/users', users);
app.use('/login', login);
app.use('/recipes', recipes);
app.use('/images', express.static(path.join(__dirname, '/uploads')));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send({ message: 'ok' });
});

app.listen(PORT, console.log(`funcionando na porta "${PORT}"`));