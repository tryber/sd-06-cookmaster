const jwt = require('jsonwebtoken');

const secret = 'secretkey';
/* eslint no-underscore-dangle: 0 */
const validateUser = async (token, userId) => {
    const payload = await jwt.verify(token, secret);
    if (payload._id !== userId) {
      if (payload.role === 'admin') {
        return payload;
      }
      throw new Error();
    }
    return payload;
};

module.exports = validateUser;
