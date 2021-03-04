const express = require('express');
const bodyParser = require('body-parser');
// const rescue = require('express-rescue'); para recuperar o erro de algum controller
const { error } = require('./middlewares');
const { UsersController, LoginController, RecipesController } = require('./controllers');

const app = express();
app.use(bodyParser.json());
// app.use((req, res, next) => {
//   res.on('finish', () => {
//     console.log({
//       method: req.method, endPoint: req.originalUrl, body: req.body, status: res.statusCode,
//     });
//   });
//   next();
// });

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/users', UsersController);
app.use('/login', LoginController);
app.use('/recipes', RecipesController);
app.use('/images', express.static(`${__dirname}/uploads`));
// app.use('/recipes', rescue(RecipesController)); com o rescue

app.use(error);

const PORT = 3000;
app.listen(PORT, () => console.log(`O PAI TÁ ON ${PORT} VEZES!`));
