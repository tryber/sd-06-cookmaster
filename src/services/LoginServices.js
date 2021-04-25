const status = require('../utils/allStatusCode');
const { getUserByEmail } = require('../models/UsersModel');
const { createToken } = require('../utils/createToken');

const LoginServices = async (req, res) => {
const { email, password } = req.body;

if (!email || !password) {
 return res.status(status.UNAUTHORIZED).json({ message: 'All fields must be filled' }); 
} 

const user = await getUserByEmail(email);

if (!user || email !== user.email || password !== user.password) {
   return res.status(status.UNAUTHORIZED).json({ message: 'Incorrect username or password' }); 
  }
  const token = createToken(user);
  return res.status(status.OK).json({ token });
};

module.exports = LoginServices;