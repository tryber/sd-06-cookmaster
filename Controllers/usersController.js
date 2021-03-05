const { Router } = require('express');
const usersService = require('../Services/usersService');
const { validateEntries, validateEmail,
     emailAlreadyExistsService } = require('../Middlewares/usersValidators');
const validateJWTAdmin = require('../Middlewares/verifyAuthorizationAdmin');

const router = Router();

// Requisito-1
router.post('/', validateEntries, validateEmail,
emailAlreadyExistsService,
 async (req, res) => {
    const { name, email, password } = req.body;  
    const newUser = await usersService.createUserService(name, email, password, 'user');  
    return res.status(201).json({ user: newUser });
  });
 
  router.post('/admin', validateJWTAdmin, async (req, res) => {
    const { name, email, password } = req.body;  
    const adminCreated = await usersService.createUser(name, email, password, 'admin');
    return res.status(201).json({ user: adminCreated });
  });

module.exports = router;