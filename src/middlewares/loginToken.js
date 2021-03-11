const Users = require('../services/UsersService');

const UNAUTHORIZED = 401;

module.exports = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await Users.getEmailAndPassword(email, password);
  
  if (!email || !password) {
    return res.status(UNAUTHORIZED).json({ message: 'All fields must be filled' });
  }

  if (!user || user.email !== email || user.password !== password) {
    return res.status(UNAUTHORIZED)
      .json({ message: 'Incorrect username or password' }); 
  }

  next();
};
