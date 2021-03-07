const { status, messages } = require('../util/dataStatus');

const { findRegisterByEmail, createUserInServer } = require('../models/modelsUsers');

const { conflict, created } = status;
const { emailexisting } = messages;

const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    const emailInServer = await findRegisterByEmail(email);

    if (emailInServer !== null) {
      return res.status(conflict).json(emailexisting);
    }
  
    const resultCreateRegister = await createUserInServer(name, email, password);

    return res.status(created).json(resultCreateRegister);
  };

  module.exports = {
    registerUser,
  };