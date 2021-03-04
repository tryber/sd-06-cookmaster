const userRouter = require('express').Router();
const rescue = require('express-rescue');
const Service = require('../services/userService');

userRouter.get('/', (req, res) => res.status(200).send('ta no routerUser'));

userRouter.post('/', rescue(async (req, res) => {
    const { name, email, password } = req.body;
    const user = await Service.createUser(name, email, password);
    
    if (!user) throw Error();
    res.status(201).json({ user });
}));

module.exports = userRouter;