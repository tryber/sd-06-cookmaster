const SUCCESS = 201;
const Users = require('../service/users');

module.exports = async (req, res) => {
  const { name, email, password } = req.body;

  const { ops } = await Users.create(name, email, password);
  const user = ops[0];

  return res.status(SUCCESS).json({ user });
};