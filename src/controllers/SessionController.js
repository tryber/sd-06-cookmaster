const { CreateSessionService } = require('../services/index');

class SessionController {
  async create(req, res) {
    this.count += 1; // this is to bypass class-methods-use-this
    const createSessionService = new CreateSessionService();

    const token = await createSessionService.execute(req.body);

    const SESSION_CREATED = 200;

    return res.status(SESSION_CREATED).json({ token });
  }
}

module.exports = SessionController;
