const { Router } = require('express');
const { usersMiddlewares } = require('../middlewares');

const router = Router();

router.post('/', usersMiddlewares.verifyBodyCreate, usersMiddlewares.create);

router.post('/admin', (req, res) => {
    res.send('teste');
});

module.exports = router;
