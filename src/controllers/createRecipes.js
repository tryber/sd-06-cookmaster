const SUCCESS = 201;
const jwt = require('jsonwebtoken');
const Recipes = require('../service/recipes');
const User = require('../service/users');

const segredo = 'seusecretdetoken';

module.exports = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const token = req.headers.authorization;
  if (!token) {
    return res.status(400).json({ error: 'Token não encontrado ou informado' });
  } try {
    const decoded = jwt.verify(token, segredo);

    const users = await User.getAll();

    const { _id: userId } = users.find((user) => user.email === decoded.data.email);

    const { ops } = await Recipes.create(name, ingredients, preparation, userId);
    const recipe = ops[0];

    return res.status(SUCCESS).json({ recipe });
  } catch (err) {
    return res.status(401).json({ message: 'jwt malformed' });
  }
};