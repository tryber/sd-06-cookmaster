const path = require('path');
const express = require('express');
const {
  userController,
  loginController,
  recipeController,
} = require('./controllers');

const app = express();
const port = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use(express.json());
app.use('/users', userController);
app.use('/login', loginController);
app.use('/recipes', recipeController);
app.use('/images', express.static(path.join(__dirname, '/images')));

app.listen(port, () => console.log('Server listening on port: ', port));
