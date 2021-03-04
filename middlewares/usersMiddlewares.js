const { dataResponse: data } = require('../utilsData');
const { usersService } = require('../services');

const create = async (req, res) => {
    const { name, email, password } = req.body;
    const createdUser = await usersService.create(name, email, password);
    return res.status(data.status.created).json(createdUser);
};

const generateToken = async (req, res) => {
    const dataBody = req.body;
    const token = await usersService.createToken(dataBody);
    return res.status(data.status.ok).json({ token });
};

module.exports = {
    create, generateToken,
};
