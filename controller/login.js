const jwt = require('jsonwebtoken');
const UsersService = require('../service/UsersService');

const secret = 'codigo-secreto';

const login = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await UsersService.findUserByEmail(email);

    const jwtConfig = {
      expiresIn: '7d',
      algorithm: 'HS256',
    };

    const token = jwt.sign({ data: user }, secret, jwtConfig);

    return res.status(200).json({ token });
  } catch (e) {
    return res.status(500).json({ message: 'Erro interno', error: e });
  }
};

module.exports = login;