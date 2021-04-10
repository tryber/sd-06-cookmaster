const express = require('express');
const path = require('path');
const userRoute = require('./src/routes/userRoute');
const loginRoute = require('./src/routes/loginRoute');
const recipesRoute = require('./src/routes/recipesRoute');

const PORT = 3000;
const app = express();

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/users', userRoute);

app.use('/login', loginRoute);

app.use('/recipes', recipesRoute);

app.use('/images', express.static(path.resolve(__dirname, 'images')));

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));