const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const path = require('path');
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

const { UsersRouter } = require('./src/Controllers/usersController');
const { LoginRouter } = require('./src/Controllers/loginController');
const { RecipesRouter } = require('./src/Controllers/recipesController');


app.use('/users', UsersRouter);
app.use('/login', LoginRouter);
app.use('/recipes', RecipesRouter);
app.use('/images', express.static(path.join(__dirname, '/images')));


const port = 3000;
app.listen(port, () => console.log(`Running on port -> ${port}`));
