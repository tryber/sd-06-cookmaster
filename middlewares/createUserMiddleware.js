const { insertNewUser } = require('../models/usersModel');

const CREATED = 201;

async function createUser(req, res, next) {
  const { name, email, password } = req.body;
  const [addedUser] = await insertNewUser(name, email, password);
  const { name: insertedName, email: insertedEmail, role, _id } = addedUser;
  res.status(CREATED).json({ user: { name: insertedName, email: insertedEmail, role, _id } });
  return next();
}

module.exports = createUser;
