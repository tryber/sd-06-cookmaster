const express = require('express');
const rescue = require('express-rescue');

const app = express();
const PORT = 3000;
const ERROR = 500;
const UsersController = require('./src/controllers/UsersController');
const LoginController = require('./src/controllers/LoginController');
const RecipesController = require('./src/controllers/RecipesController');

app.use(express.json());
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
// nao remova o endpoint acima
app.use((req, res, next) => {
  res.on('finish', () => console.log({
    date: new Date(),
    req: {
      host: req.get('host'),
      method: req.method,
      endPoint: req.originalUrl,
      data: {
        headers: JSON.stringify(req.headers, 0, 2),
        body: JSON.stringify(req.body, 0, 2),
        params: JSON.stringify(req.params, 0, 2),
        query: JSON.stringify(req.query, 0, 2),
      },
    },
    res: {
      status: res.statusCode,
    },
  }));
  next();
});
// deixando a imagem disponivel de volta com rota dinamica
app.use('/images', express.static(`${__dirname}/uploads`));
app.use('/users', rescue(UsersController));
app.use('/login', rescue(LoginController));
app.use('/recipes', rescue(RecipesController));
app.use((error, req, res, _next) => {
  console.log({ error });
  return res.status(ERROR).json({ message: 'Erro Interno!' });
});
app.listen(PORT, () => console.log('Example app listening on port port!'));
