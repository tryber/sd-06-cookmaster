const express = require('express');

const app = express();

const path = require('path');

const port = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

const bodyParser = require('body-parser');
const { UsersRouter } = require('./Controller/usersController');
const { LoginRouter } = require('./Controller/loginController');
const { RecipesRouter } = require('./Controller/recipesController');

app.use(bodyParser.json());

app.use('/users', UsersRouter);

app.use('/login', LoginRouter);

app.use('/recipes', RecipesRouter);

app.use('/images', express.static(path.join(__dirname, 'uploads')));

app.listen(port, () => console.log(`Listening to ${port}`));
