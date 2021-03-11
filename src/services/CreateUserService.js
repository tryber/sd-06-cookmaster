const { createUserDb } = require('../models/UserModel');

const CREATED = 201;

const CreateUserService = async (body, res) => {
    const { name, email, password } = body;

    const newUser = await createUserDb(name, email, password);

    return res.status(CREATED).json({ user: newUser.ops[0] });
};

module.exports = CreateUserService;
