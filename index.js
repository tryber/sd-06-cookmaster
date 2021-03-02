const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./Routes/userRoutes');
const loginRoute = require('./Routes/loginRoute');

const app = express();
const port = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use(bodyParser.json());

app.use('/users', userRoutes);

app.use('/login', loginRoute);

app.listen(port, () => console.log(`Cookmaster is running on port ${port}!`));
