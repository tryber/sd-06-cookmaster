const services = require('../services/usersServices');

const createUser = async (req, res, next) => {
  try {
    const newUser = req.body;
    const userCreated = await services.createUser(newUser);

    res.status(201).json({ user: userCreated });
  } catch (err) {
    next(err);
  }
};

module.exports = { createUser };
