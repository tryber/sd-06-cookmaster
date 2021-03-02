const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const Recipes = require('./controllers/RecipesController');
const Users = require('./services/UserServices');
const createToken = require('./Auth/createToken');

const app = express();
const PORT = 3000;

app.use(express.static(`${__dirname}images/`));

app.use(bodyParser.json());
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.post('/users', async (req, res) => {
  try {
    const data = await Users.register(req.body);
    res.status(201).json(data);
  } catch (error) {
    if (error.message === 'Email already registered') {
      return res.status(409).json({ message: error.message });
    }
    return res.status(400).json({ message: error.message });
  }
});

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const data = await Users.findByEmail(email, password);
    const { _id, email: emaill, role } = data;
    const token = await createToken({ _id, emaill, role });
    return res.status(200).json({ token });
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
});

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/recipes', Recipes);

app.listen(PORT);