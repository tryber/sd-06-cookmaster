const express = require('express');
const { usersRouter } = require('./src/controllers/userController');
const { loginRouter } = require('./src/controllers/loginController');
const { recipesRouter } = require('./src/controllers/recipeController');

const PORT = 3000;
const app = express();
app.use(express.json());

app.get('/', (request, response) => {
  response.send();
});

app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/recipes', recipesRouter);

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
