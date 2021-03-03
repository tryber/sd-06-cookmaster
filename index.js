const express = require('express');
const bodyParse = require('body-parser');
const CookerController = require('./controller/CookerController');

const app = express();

app.use(bodyParse.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/users', CookerController);

const PORT = 3000;
app.listen(PORT, () => console.log(`la course aux étoiles Ça n'est pas ...on PORT ${PORT}`));