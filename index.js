const express = require('express');
const userRoutes = require('./controllers/userRoutes');
const loginRoute = require('./controllers/loginRoute');

const PORT = 3000;
const app = express();

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/users', userRoutes);

app.use('/login', loginRoute);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
