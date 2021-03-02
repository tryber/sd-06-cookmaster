const jwt = require('jsonwebtoken');
const model = require('../models/usersModel');

const secret = 'hashzaoGigante';

module.exports = async (request, response, next) => {
  const token = request.headers.authorization;

  if (!token) return response.status(401).json({ message: 'missing auth token' });

  try {
    const decoded = jwt.verify(token, secret);

    const user = await model.findUserByEmail(decoded.email);
    
    if (!user) return response.status(401).json({ message: 'jwt malformed' });

    request.user = user;

    next();
  } catch (error) {
    response.status(401).json({ message: 'jwt malformed' });
  }
};