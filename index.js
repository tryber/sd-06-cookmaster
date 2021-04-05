const express = require('express');

const userController = require('./src/controllers/userController');
const loginController = require('./src/controllers/loginController');
const recipeController = require('./src/controllers/recipeController');

const app = express();
const PORT = 3000;

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/users', userController);

app.use('/login', loginController);

app.use('/recipes', recipeController);

app.use('/images', express.static(`${__dirname}/uploads`));

app.listen(PORT, () => console.log(`Server Started on port ${PORT}`));
