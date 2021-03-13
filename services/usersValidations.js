const { usersCrudDb } = require('../models');

const verifyName = (name) => {
    if (!name || typeof name !== 'string' || name === '') return true;
};

const verifyEmail = (email) => {
    const regexEmail = /^[a-z0-9._]+@[a-z0-9]+\.[a-z]+$/i;
    if (!email || email === '' || !regexEmail.test(email)) return true;
};

const searchUserByEmail = async (email) => {
    const getEmail = await usersCrudDb.selectByEmail(email);
    if (getEmail) return true;
    return false;
};

const verifyPassword = (password) => {
    if (!password || password === '') return true;
};

module.exports = {
    verifyEmail,
    verifyName,
    verifyPassword,
    searchUserByEmail,   
};
