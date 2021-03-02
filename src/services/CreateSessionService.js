const jwt = require('jsonwebtoken');

const AppError = require('../errors/AppError');
const { UNAUTHORIZED } = require('../errors/status');
const authConfig = require('../config/auth');

const emailError = 'Incorrect username or password';

class CreateSessionService {
  constructor(UserModel) {
    this.UserModel = UserModel;
  }

  async execute({ email, password }) {
    const user = await this.UserModel.findByEmail(email);

    if (!user) throw new AppError(emailError, UNAUTHORIZED);

    if (user.password !== password) throw new AppError(emailError, UNAUTHORIZED);

    const { _id: id } = user;
    const payload = { email: user.email, id, role: user.role };

    const { expiresIn, secret } = authConfig.jwt;
    const jwtPayload = { expiresIn };
    const token = jwt.sign(payload, secret, jwtPayload);

    return token;
  }
}

module.exports = CreateSessionService;
