const mail = require('../../models/modelUsers');

const authMailPass = async (req, res, next) => {
  const UNAUTHORIZED = 401;
  const { email, password } = req.body;
  const searcher = await mail.getByEmail({ email, password });
  
  if (!searcher) {
     return res.status(UNAUTHORIZED).json({ message: 'Incorrect username or password' });
  }
  next();
};

module.exports = authMailPass;
