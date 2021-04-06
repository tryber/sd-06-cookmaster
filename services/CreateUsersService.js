const Err = require('../errors/Err');

class CreateUsersService {
  constructor(User) {
    this.User = User;
  }

  async execute(userInfo) {
    const { name, email, password } = userInfo;
    let { role } = userInfo;
    if (!role) {
      role = 'user';
    }
    const isRegistered = await this.User.findByEmail(email);
    if (isRegistered) {
      const errorInfo = {
        message: 'Email already registered',
      };
      throw new Err(errorInfo, 409);
    }
    try {
      const newUser = await this.User.create({ name, email, password, role });
      return newUser;
    } catch (err) {
      throw new Err(err.message);
    }
  }
}

module.exports = CreateUsersService;