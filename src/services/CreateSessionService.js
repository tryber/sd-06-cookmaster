const { sign } = require('jsonwebtoken');

const { session } = require('../config/auth');

const { Users } = require('../database/index');

const AppError = require('../utils/AppError');
const { UNAUTHORIZED } = require('../utils/errorStatus');

class CreateSessionService {
  async execute({ email, password }) {
    this.count += 1;
    const usersModel = new Users();
    const user = await usersModel.findOne({ email });

    if (!user) throw new AppError('Incorrect username or password', UNAUTHORIZED);

    const passwordMatched = password === user.password;

    if (!passwordMatched) throw new AppError('Incorrect username or password', UNAUTHORIZED);

    const { _id: id, role } = user;
    const { expiresIn, secret } = session;

    const token = sign({ email, id, role }, secret, { expiresIn });
    return token;
  }
}

module.exports = CreateSessionService;
