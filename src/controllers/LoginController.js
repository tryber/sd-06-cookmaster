const { createToken } = require('../auth/createToken');
const userModel = require('../models/User');

const loginControler = async (req, res) => {
  try {
    const { email } = req.body;

    const userByEmail = await userModel.findUserByEmail(email);

    console.log(userByEmail);

    const token = createToken(userByEmail);

    return res.status(200).json({ token });
  } catch (e) {
    return res.status(500).json({ message: 'Erro interno', error: e });
  }
};

module.exports = {
  loginControler,
};