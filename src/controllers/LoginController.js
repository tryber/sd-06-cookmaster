// const rescue = require('express-rescue');
// const jwt = require('jsonwebtoken');
// const { LoginService } = require('../services');

// const SUCCESS = 200;

// const userLogin = rescue(async (req, res) => {
//   const { email, password } = req.body;

//   const login = await LoginService.userLogin(email, password);

//   const jwtConfig = {
//     expiresIn: '1m',
//     algorithm: 'HS256',
//   };

//   const token = jwt.sign()

//   res
//     .status(SUCCESS)
//     .json(login);
// });

// module.exports = {
//   userLogin,
// };
