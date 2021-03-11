import { Router } from 'express'
import { usersController, loginController, recipesController } from './controllers'

const router = Router();

router.use('/users', usersController);
router.use('/login', loginController);
router.use('/recipes', recipesController);

export default router