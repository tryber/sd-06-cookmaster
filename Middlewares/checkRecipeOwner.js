const validateToken = require('../auth/validateToken');
const controllers = require('../Controllers/recipeControllers');

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;
  const { id } = req.params;

  const errorMessage = 'missing auth token';

  const { _id, email } = validateToken(token);

  if (!email) return res.status(401).send({ message: errorMessage });

  const { userId } = await controllers.findById(id);

  if (_id !== userId && email !== 'root@email.com') {
    return res.status(401).send({ message: errorMessage });
  }

  next();
};