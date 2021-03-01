const { userFindEmail } = require('../service/userService');

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

module.exports = {
  checkUser,
};
