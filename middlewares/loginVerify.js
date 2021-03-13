const { dataResponse: data } = require('../utilsData');
const { usersValidations: valid, usersServices } = require('../services');

const verifyBodyLogin = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await usersServices.selectUser(email);
  switch (true) {
    case valid.verifyEmail(email):
      return res.status(data.status.unauthorized).json(data.objAnswer.err_body.err3);
    case valid.verifyPassword(password):
      return res.status(data.status.unauthorized).json(data.objAnswer.err_body.err3);
    case user && user.password !== password:
      return res.status(data.status.unauthorized).json(data.objAnswer.err_body.err3);
    case await !user:
      return res.status(data.status.unauthorized).json(data.objAnswer.err_body.err4);
    default: console.log({ user: 'Logged' });
  }
  next();
};

const generateToken = async (req, res) => {
  const dataBody = req.body;
  const token = await usersServices.createToken(dataBody);
  return res.status(data.status.ok).json({ token });
};

module.exports = { verifyBodyLogin, generateToken };
