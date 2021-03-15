const express = require('express');
const bodyParser = require('body-parser');
const { LoginController, RecipeController, UserController } = require('./controllers');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/users', UserController);

app.use('/login', LoginController);

app.use('/recipes', RecipeController);

app.listen(PORT, () => console.log(`listen at port: ${PORT}`));
