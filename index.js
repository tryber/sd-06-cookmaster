const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./Routes/userRoutes');

const app = express();
const port = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use(bodyParser.json());

app.use('/users', userRoutes);

app.listen(port, () => console.log(`Cookmaster is running on port ${port}!`));
