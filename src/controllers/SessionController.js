const User = require('../database/models/User');

const HashProvider = require('../providers/hashProvider');

const CreateSessionService = require('../services/CreateSessionService');

class SessionController {
  async create(request, response) {
    this.count += 1;
    const { email, password } = request.body;

    const userModel = new User();
    const hashProvider = new HashProvider();
    const createSessionService = new CreateSessionService(userModel, hashProvider);

    const sessionInfo = { email, password };

    const token = await createSessionService.execute(sessionInfo);

    const CREATED = 200;

    return response.status(CREATED).json({ token });
  }
}

module.exports = SessionController;
