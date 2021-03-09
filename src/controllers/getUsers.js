const SUCCESS = 200;
const Users = require('../service/index');

module.exports = async (req, res) => {
  const result = await Users.getAll();

  return res.status(SUCCESS).json(result);
};