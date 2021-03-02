const controllers = require('../Controllers/userControllers');

const CREATED = 201;

module.exports = async (req, res, next) => {
  const { name, email, password } = req.body;

  const newUser = await controllers.create(name, email, password);

  if (newUser.code) {
    return res.status(newUser.code).send({ message: newUser.message });
  }

  res.status(CREATED).json(newUser);

  return next();
};
