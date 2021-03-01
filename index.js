const express = require('express');

const app = express();
const port = 3000;

const bodyParser = require('body-parser');
const { usersRouter } = require('./controllers/usersController');
const { loginRouter } = require('./controllers/loginController');
const { recipesRouter } = require('./controllers/recipesController');

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use(bodyParser.json());

app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/recipes', recipesRouter);

app.listen(port, () => console.log(`Listening to port ${port}`));
