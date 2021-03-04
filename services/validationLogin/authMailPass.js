const mail = require('../../models/modelUsers');

const authMailPass = async (req, res, next) => {
  const UNAUTHORIZED = 401;
  const { email, password } = req.body;
  const searcher = await mail.getByEmail({ email, password });
  
  if (!searcher) return next(UNAUTHORIZED, { message: 'Incorrect username or password' });
  req.infoUser = searcher;
  next();
};

module.exports = authMailPass;
