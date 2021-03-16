const express = require('express');
const path = require('path');
const userRoute = require('./routes/userRoute');
const loginRoute = require('./routes/loginRoute');
const recipesRoute = require('./routes/recipesRoute');

const PORT = 3000;
const app = express();

app.use('/images', express.static(path.resolve(__dirname, 'images')));
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/users', userRoute);

app.use('/login', loginRoute);

app.use('/recipes', recipesRoute);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
