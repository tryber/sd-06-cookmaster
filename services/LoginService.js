const Err = require('../errors/Err');

class LoginService {
  constructor(User) {
    this.User = User;
  }

  async execute({ email, password }) {
    if (!email || !password) {
      const errorInfo = {
        message: 'All fields must be filled',
      };
      throw new Err(errorInfo, 401);
    }
    const userInfo = await this.User.findByEmail(email);
    if (!userInfo || userInfo.password !== password) {
      const errorInfo = {
        message: 'Incorrect username or password',
      };
      throw new Err(errorInfo, 401);
    }
    return userInfo;
  }
}

module.exports = LoginService;
