const express = require('express');

const app = express();

const port = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

const { users } = require('./src/controller/userController');

const { login } = require('./src/controller/loginController');

const { recipes } = require('./src/controller/recipesController');

app.use(express.json());
app.use('/users', users);
app.use('/login', login);
app.use('/recipes', recipes);

app.listen(port, () => 
console.log(`Knocking on the ${port}th door`));
