const express = require('express');
const bodyParser = require('body-parser');
const usersRouter = require('./controllers/UsersController');
const recipesRouter = require('./controllers/RecipesController');
const error = require('./middlewares/error');
const userLogin = require('./middlewares/Login');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use(express.static(`${__dirname}/`));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/users', usersRouter);
app.use('/recipes', recipesRouter);
app.post('/login', userLogin);
app.use(error);

app.listen(port, () => console.log('Example app listening on port port!'));
