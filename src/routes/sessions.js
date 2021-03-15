const { Router } = require('express');

const SessionController = require('../controllers/SessionController'); 

const validateLoginObj = require('../middlewares/validateLoginObj');

const sessionRouter = Router();

const sessionController = new SessionController();

sessionRouter.post('/login', validateLoginObj, sessionController.create);

module.exports = sessionRouter;
