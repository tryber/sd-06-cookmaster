const express = require('express');

const app = express();
const PORT = parseInt(process.env.PORT, 10) || 3000;
const NOT_FOUND = 404;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.all('*', (req, res) => res.status(NOT_FOUND).json({ message: 'End point not found' }));

app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
