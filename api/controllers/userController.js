const Service = require('../services/userService');

const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const role = 'user';

    const user = await Service.createUser(name, email, password, role);
    res.status(201).json({ user });
  } catch (e) {
    if (e.message === 'Invalid entries. Try again.') res.status(400).json({ message: e.message });
    if (e.message === 'Email already registered') res.status(409).json({ message: e.message });
  }
};

module.exports = {
  createUser,
};

// try {
//   myroutine(); // pode lançar três tipos de exceções
// } catch (e) {
//   if (e instanceof TypeError) {
//       // declarações para manipular exceções TypeError
//   } else if (e instanceof RangeError) {
//       // declarações para manipular exceções RangeError
//   } else if (e instanceof EvalError) {
//       // declarações para manipular exceções EvalError
//   } else {
//      // declarações para manipular quaisquer exceções não especificadas
//      logMyErrors(e); // passa o objeto de exceção para o manipulador de erro
//   }
// }