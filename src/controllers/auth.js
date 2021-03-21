const SUCCESS = 200;
const jwt = require('jsonwebtoken');

const secret = 'seusecretdetoken';

module.exports = async (req, res) => {
  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };

  const token = jwt.sign({ data: req.user }, secret, jwtConfig);

  res.status(SUCCESS).json({ token });
};