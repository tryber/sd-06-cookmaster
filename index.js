const bodyParser = require('body-parser');
const express = require('express');
const { loginController } = require('./controller/loginController');
const { recipesController } = require('./controller/recipesController');
const { userController } = require('./controller/userController');

const app = express();

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', userController);
app.use('/login', loginController);
app.use('/recipes', recipesController);

app.get('/', (request, response) => response.send());

app.listen(3000, () => console.log('listening on port 3000!'));
