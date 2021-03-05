const { generateError } = require('../../utils/error');
const status = require('../../utils/status');
const Users = require('../../models/Users');

const SignIn = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await Users.findOneByEmail(email);
    const invalidData = 'Incorrect username or password';
    if (!user) throw generateError(status.NOT_AUTHORIZED, 'Not_Authorized', invalidData);
    const { password: dbPass, _id: id, role } = user;

    console.log('dbpass', dbPass, 'password', password, id, 'userid');
    if (dbPass !== password) {
      throw generateError(status.NOT_AUTHORIZED, 'Not_Authorized', invalidData);
    }
    res.locals.user = { email, id, role };
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = SignIn;