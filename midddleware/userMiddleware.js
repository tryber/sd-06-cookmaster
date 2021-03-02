const { userFindEmail, userFindPassword } = require('../service/userService');

const checkUser = async (req, res, next) => {
  const badRequest = 400;
  const conflict = 409;
  const { name, email, password } = req.body;
  const checkEmail = /^([a-z\d.-]+)@([a-z\d-]+)\.([a-z]{3,8})?$/.test(email);
  const findEmail = await userFindEmail(email);

  if (!name || !email || !password || checkEmail === false) {
    return res.status(badRequest)
      .json({ message: 'Invalid entries. Try again.' });
  }
  if (findEmail.length > 0) {
    return res.status(conflict).json({ message: 'Email already registered' });
  }
  next();
};
const checkLogin = async (req, res, next) => {
  const um = 1;
  const unauthorized = 401;
  const { email, password } = req.body;
  const findEmail = await userFindEmail(email);
  const findPassword = await userFindPassword(password);
  if (!email || !password) {
    return res.status(unauthorized)
      .json({ message: 'All fields must be filled' });
  }
  if (findEmail.length < um || findPassword.length < um) {
    return res.status(unauthorized).json({ message: 'Incorrect username or password' });
  }
  // console.log(findPassword.length);
  next();
};
module.exports = {
  checkUser,
  checkLogin,
};
