const express = require('express');
const userController = require('./src/controllers/userController');

// const login = require('./src/controllers/loginController');
// const recipes = require('./src/controllers/recipesController');

const app = express();
const port = 3000;

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

/** definindo minhas rotas */
app.use('/users', userController);
// app.use('/login', login);
// app.use('/recipes', recipes);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
