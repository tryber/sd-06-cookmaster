const { createUserDb } = require('../models/UserModel');
// const { INVALID_ENTRIES } = require('../errors/messagesErrors');

// const BAD_REQUEST = 400;

// const emailValidation = (userByEmail, email, res) => {
//     if (userByEmail.email === email) {
//         return res.status(BAD_REQUEST).json(INVALID_ENTRIES);
//     }
// };

const CreateUserService = async ({ name, email, password }, _res) => {
    const newUser = await createUserDb(name, email, password);

    return newUser;
};

module.exports = CreateUserService;
