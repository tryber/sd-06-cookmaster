const userModels = require('../Models/usersModel');

const errInvalidEntries = { message: 'Invalid entries. Try again.' };
const errEmail = { message: 'Email already registered' };
const errStatus = 400;
const errEmailStatus = 409;
const createStatus = 201;

const create = async (req, res) => {
  const { name, email, password } = req.body;

  const created = await userModels.create(name, email, password);

  res.status(createStatus)
    .json({ user: { _id: created.insertedId, name, email, password, role: 'user' } });
};

module.exports = {
  create,
};
