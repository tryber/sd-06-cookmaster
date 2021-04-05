const express = require('express');
const rescue = require('express-rescue');
const { usersRouter } = require('./controllers/userController');
const { loginRouter } = require('./controllers/loginController');
const { recipesRouter } = require('./controllers/recipeController');

const PORT = 3000;
const app = express();
app.use(express.json());

app.get('/', (request, response) => {
  response.send();
});

app.use('/users', rescue(usersRouter));
app.use('/login', rescue(loginRouter));
app.use('/recipes', rescue(recipesRouter));

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
