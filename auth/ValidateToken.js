const jwt = require('jsonwebtoken');

const secret = 'mysecret';

module.exports = (token) => {
  try {
    // console.log(token);
    // const decoded = await jwt.verify(token, secret);
    // console.log(await jwt.decode(token));
    const decoded = jwt.verify(token, secret);
    // console.log(decoded);
  } catch (err) {
    console.log(err);
  }
};
