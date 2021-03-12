const { status } = require('../util/dataStatus');

const { findRegisterByEmail } = require('../models/modelsUsers');
const createToken = require('../util/createTokenJWT');

const { OK } = status;

const LoginUserAndCreateToken = async (req, res) => {
    const { email } = req.body;
    const { password: passwordDB, ...userWithoutPassword } = await findRegisterByEmail(email);

    const { token } = createToken(userWithoutPassword);
    
    return res.status(OK).json({ token });
  };

  module.exports = {
    LoginUserAndCreateToken,
  };