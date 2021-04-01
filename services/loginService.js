const { createToken } = require('../auth/createToken');
const controllers = require('../controllers/userController');

const loginService = async (email, password) => {
  const user = await controllers.getByEmail(email);
  if (user === null || user.password !== password) {
    return { error: true, code: 'unauthorized', message: 'Incorrect username or password' };
  }
  const { password: _, ...userWithoutPassword } = user;
  const token = await createToken(userWithoutPassword);
  return token;
};

module.exports = { loginService };
