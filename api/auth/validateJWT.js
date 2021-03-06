const jwt = require('jsonwebtoken');
const Model = require('../models/userModel');

const secret = 'batata123';

module.exports = async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) return res.status(401).json({ message: 'missing auth token' });
    
    if (!token) throw Error('jwt malformed');
    const decoded = jwt.verify(token, secret);
    const user = await Model.findByEmail(decoded.data.email);

    if (!user) throw Error('jwt malformed');
    req.user = user;
   
    next();
};
