const express = require('express')
const app = express()
const PORT = 3000

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.get('/', (req, res) => res.send('COOKMASTER'))
app.listen(PORT, () => console.log(`Example app listening on PORT ${PORT}!`))