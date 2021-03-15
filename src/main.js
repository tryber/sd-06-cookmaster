const express = require('express');
const userRoute = require('./routes/userRoute');
const loginRoute = require('./routes/loginRoute');
const recipesRoute = require('./routes/recipesRoute');

const PORT = 3000;
const app = express();

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/users', userRoute);

app.use('/login', loginRoute);

app.use('/recipes', recipesRoute);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
