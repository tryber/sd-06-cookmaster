const { usersCrudDb } = require('../models');
const { generateToken: auth } = require('../authentication');

const create = async (dataUser) => usersCrudDb.createUser(dataUser);

const createToken = async (dataBody) => auth.createToken(dataBody);

const selectUser = async (email) => {
    const user = await usersCrudDb.selectByEmail(email);
    return user;
};

module.exports = {
    create,
    createToken,
    selectUser,
};
