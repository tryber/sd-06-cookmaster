const express = require('express');
const bodyParser = require('body-parser');

// user imports
const userController = require('./Controller/usersController');
const serviceValidations = require('./Services/userValidations');
// recipes imports
const recipesController = require('./Controller/recipesController');
const recipesValidation = require('./Services/recipesValidation');

const app = express();
const PORT = 3000;
const routeRecipesId = '/recipes/:id';
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

// users rotas
app.post('/users', serviceValidations.createValidation, userController.create);
app.post('/login', serviceValidations.loginValidation, userController.login);

// recipes rotas
app.get(routeRecipesId, recipesValidation.idValidation, recipesController.getById);
app.put(routeRecipesId, recipesValidation.updateValidation, recipesController.update);
app.delete(routeRecipesId, recipesValidation.removeValidation, recipesController.remove);
app.get('/recipes', recipesController.getAll);
app.post('/recipes', recipesValidation.createValidation, recipesController.create);

app.listen(PORT, () => console.log(`Ouvindo a porta ${PORT}`));
