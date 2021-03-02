const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const Recipes = require('./controllers/RecipesController');
const Users = require('./services/UserServices');
const checkEmail = require('./middlewares/checkEmail');

const createToken = require('./Auth/createToken');

const app = express();
const PORT = 3000;

app.use(express.static(`${__dirname}images/`));

app.use(bodyParser.json());
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.post('/users', checkEmail, async (req, res) => {
  try {
    const data = await Users.register(req.body);
    res.status(201).json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) res.status(401).json({ message: 'All fields must be filled' });
    const { _id, email: emaill, role } = await Users.findByEmail(email, password);
    const token = await createToken({ _id, emaill, role });
    return res.status(200).json({ token });
  } catch (error) {
    return res.status(401).json({ message: 'Incorrect username or password' });
  }
});

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/recipes', Recipes);

app.listen(PORT);