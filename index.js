const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const validateToken = require('./auth/validateToken');
const { usersRouter, createADM } = require('./controller/userController');
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
app.use('/images', express.static(path.join(__dirname, './uploads')));

app.post('/users/admin', validateToken, createADM);

app.listen(PORT, () => console.log(`${PORT} running fine
!`));
