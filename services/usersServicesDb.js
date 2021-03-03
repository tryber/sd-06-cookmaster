const { usersCrudDb } = require('../models');

const create = async (req, res) => {
    const { name, email, password } = req.body;
    const createdUser = await usersCrudDb.createUser(name, email, password);    
    return res.status(201).json(createdUser);
};

module.exports = {
    create,
};
