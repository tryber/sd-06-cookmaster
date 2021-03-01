const express = require('express');
const Recipes = require("./controllers/RecipesController");
const Users = require('./services/UserServices');
const bodyParser = require('body-parser');


const createToken = require('./Auth/createToken');
const app = express();
const PORT = 3000;


app.use(bodyParser.json());
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.post('/users', async (req, res) => {
  const data = await Users.register(req.body);
  res.status(200).json(data);
});

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const { _id, email: emaill, role } = await Users.findByEmail(email, password);
    const token = await createToken({ _id, emaill, role });
    return res.status(200).json( { token } );
  } catch (error) {
    return res.status(401).json({ message: "E-mail ou senha Inválidos" });
  }
});


app.use('/recipes', Recipes);

app.listen(PORT);