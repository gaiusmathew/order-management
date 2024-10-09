import { Router } from 'express';
import { UserController } from '../controllers/userController';

const router = Router();
const userController = new UserController();

router.post('/', userController.createUser);
router.post('/login', userController.loginUser);

export default router;
