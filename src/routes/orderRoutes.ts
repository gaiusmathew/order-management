import { Router } from 'express';
import { OrderController } from '../controllers/orderController';
import { authenticateJWT } from '../middleware/authMiddleware';

const router = Router();
const orderController = new OrderController();

router.post('/', authenticateJWT, orderController.createOrder);
router.get('/', authenticateJWT, orderController.getOrders);
router.get('/:id', authenticateJWT, orderController.getOrder);
router.post('/:id/pay', authenticateJWT, orderController.processPayment);

export default router;
