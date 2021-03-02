const { Router } = require('express');
const usersService = require('../Services/usersService');
const { validateEntries, validateEmail,
     emailAlreadyExistsService } = require('../Middlewares/usersValidators');

const router = Router();

router.post('/', validateEntries, validateEmail, emailAlreadyExistsService,
 async (req, res) => {
    const { name, email, password } = req.body;  
    const newUser = await usersService.createUserService(name, email, password, 'user');  
    return res.status(201).json({ user: newUser });
  });

module.exports = router;