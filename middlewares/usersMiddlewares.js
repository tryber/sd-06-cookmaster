const { dataResponse: data } = require('../utilsData');
const { usersServices } = require('../services');

const create = async (req, res) => {
    const { name, email, password } = req.body;
    const createdUser = await usersServices.create(name, email, password);
    return res.status(data.status.created).json(createdUser);
};

module.exports = {
    create,
};
