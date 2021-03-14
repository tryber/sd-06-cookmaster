const express = require('express');
const userRoutes = require('./src/controllers/userRoute');
const loginRoute = require('./src/controllers/loginRoute');
const recipesRoute = require('./src/controllers/recipesRoute');

const PORT = 3000;
const app = express();

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/users', userRoutes);

app.use('/login', loginRoute);

app.use('/recipes', recipesRoute);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
