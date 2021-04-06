const { newUserInserted } = require('../models/usersModel');

async function userCreate(req, res, next) {
  const { name, email, password } = req.body;
  const [userAdded] = await 
    newUserInserted(name, email, password);
  const { 
    name: nameInserted, 
    email: emailInserted, 
    role, _id } = userAdded;
  res.status(201).json({ 
    user: { 
      name: nameInserted, 
      email: emailInserted, 
      role, 
      _id } });
  return next();
}

module.exports = userCreate;
