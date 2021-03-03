const express = require('express');

const app = express();
const PORT = 3000;
const controller = require('./src/controllers/userController');

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.post('/users', controller.createUser);
app.post('/login', controller.loginUser);

app.listen(PORT, () => console.log(`Example app listening on PORT ${PORT}!`));
