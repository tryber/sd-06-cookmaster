const express = require('express');
const bodyParser = require('body-parser');
// const recipesController = require('./controller/recipesController');
const userController = require('./controller/userController');

const app = express();
 app.use(bodyParser.json());
const PORT = 3000; 

app.use('/users', userController);
// app.use('/recipes', recipesController);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.listen(PORT, () => { console.log(`rodando porta ${PORT}`); });
