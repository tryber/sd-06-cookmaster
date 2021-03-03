const { dataResponse: err } = require('../utilsData');
const { usersCrudDb } = require('../models');

const verifyName = (name) => {
    if (!name || typeof name !== 'string' || name === '') return true;
};

const verifyEmail = (email) => {
    const regexEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/i;
    if (!email || email === '' || !regexEmail.test(email)) return true;
};

const searchEmail = async (email) => {
    const getEmail = await usersCrudDb.selectByEmail(email);
    if (getEmail) return true;
};

const verifyPassword = (password) => {
    if (!password || password === '') return true;
};

const verifyBody = async (req, res, next) => {
    const { name, email, password } = req.body;
    switch (true) {
        case verifyName(name):
            return res.status(400).json(err.objectMenssages.err_body.err1);
        case verifyEmail(email):
            return res.status(400).json(err.objectMenssages.err_body.err1);
        case await searchEmail(email):
            return res.status(409).json(err.objectMenssages.err_body.err2);
        case verifyPassword(password):
            return res.status(400).json(err.objectMenssages.err_body.err1);
        default: console.log({ ok: true });
    }
    next();
};

module.exports = { verifyBody };
