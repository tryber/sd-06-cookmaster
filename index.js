const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
require('express-async-errors');
const usersRouter = require('./routes/UsersRoutes');
const handleError = require('./middlewares/handleError');
const loginRouter = require('./routes/LoginRoutes');
const recipesRouter = require('./routes/RecipesRoutes');

const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/users', usersRouter);

app.use('/login', loginRouter);

app.use('/recipes', recipesRouter);

app.use('/images', express.static(path.join(__dirname, 'uploads')));

app.use(handleError);

const SERVER_PORT = 3000;

app.listen(SERVER_PORT);
