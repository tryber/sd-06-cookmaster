const express = require('express');

const app = express();
const PORT = 3000;
const controller = require('./src/controllers/userController');
const recipeController = require('./src/controllers/recipeController');

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.post('/users', controller.createUser);
app.post('/login', controller.loginUser);
app.use('/recipes', recipeController);

app.listen(PORT, () => console.log(`Example app listening on PORT ${PORT}!`));
