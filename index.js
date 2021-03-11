const express = require('express');
const bodyParser = require('body-parser');
const { usersRouter } = require('./controller/userController');
const { loginRouter } = require('./controller/loginController');
const { RecipesRouter } = require('./controller/recipeController');

const app = express();

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

const PORT = 3000;

app.use(bodyParser.json());

app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/recipes', RecipesRouter);

app.listen(PORT, () => console.log(`${PORT} running fine
!`));
