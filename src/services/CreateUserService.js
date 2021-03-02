const AppError = require('../errors/AppError');
const { CONFLICT } = require('../errors/status');

const emailError = 'Email already registered';

class CreateUserService {
  constructor(UserModel, HashProvider) {
    this.UserModel = UserModel;
    this.HashProvider = HashProvider;
  }

  async execute({ email, password, name, role }) {
    const userWithEmail = await this.UserModel.findByEmail(email);

    if (userWithEmail) throw new AppError(emailError, CONFLICT);

    const userRole = role || 'user';
    const hashedPassword = await this.HashProvider.generateHash(password);

    const userToCreate = {
      email,
      password: hashedPassword,
      role: userRole,
      name,
    };

    const { password: x, ...newUser } = await this.UserModel.create(userToCreate);

    return newUser;
  }
}

module.exports = CreateUserService;
