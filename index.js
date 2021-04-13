const express = require('express');
const userController = require('./controller/usersController');
const loginController = require('./controller/loginController');

const app = express();
app.use(express.json());

app.use('/users', userController);
app.use('/login', loginController);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Hashirama protegendo o portão da vila ${PORT}`));
