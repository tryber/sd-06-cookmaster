const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const error = require('./middlewares/error');
const users = require('./controllers/users');
const login = require('./controllers/login');
const recipes = require('./controllers/recipes');

const app = express();
const port = 3000;

app.use('/images', express.static(path.join(__dirname, 'uploads')));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use(bodyParser.json());

app.use('/users', users);

app.use('/login', login);

app.use('/recipes', recipes);

// app.all('*', (_req, res) => res.status(404).json({ message: 'Rota não encontrada' }));

app.use(error);

app.listen(port, () => console.log(`listening to port ${port}`)); 
