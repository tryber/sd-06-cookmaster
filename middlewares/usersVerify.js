const { dataResponse: data } = require('../utilsData');
const { usersValidations: valid } = require('../services');

const verifyBodyCreate = async (req, res, next) => {
  const { name, email, password } = req.body;
  switch (true) {
    case valid.verifyName(name):
      return res.status(data.status.bad_request).json(data.objAnswer.err_body.err1);
    case valid.verifyEmail(email):
      return res.status(data.status.bad_request).json(data.objAnswer.err_body.err1);
    case await valid.searchEmail(email):
      return res.status(data.status.conflict).json(data.objAnswer.err_body.err2);
    case valid.verifyPassword(password):
      return res.status(data.status.bad_request).json(data.objAnswer.err_body.err1);
    default: console.log({ ok: true });
  }
  next();
};

const verifyBodyLogin = async (req, res, next) => {
  const { email, password } = req.body;
  const getEmail = await valid.selectUser(email);
  switch (true) {
    case valid.verifyEmail(email):
      return res.status(data.status.unauthorized).json(data.objAnswer.err_body.err3);
    case valid.verifyPassword(password):
      return res.status(data.status.unauthorized).json(data.objAnswer.err_body.err3);
    case getEmail && getEmail.user.password !== password:
      return res.status(data.status.unauthorized).json(data.objAnswer.err_body.err3);
    case await !getEmail:
      return res.status(data.status.unauthorized).json(data.objAnswer.err_body.err4);
      default: console.log({ ok: true });
  }
  next();
};

module.exports = { verifyBodyCreate, verifyBodyLogin };
