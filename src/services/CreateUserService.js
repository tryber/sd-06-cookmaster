const { createUserDb } = require('../models/UserModel');

const CreateUserService = async ({ name, email, password }) => {
    const newUser = await createUserDb(name, email, password);

    return newUser;
};

module.exports = CreateUserService;
