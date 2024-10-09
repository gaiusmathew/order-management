import { Request, Response } from 'express';
import { OrderService } from '../services/orderService';
import { z } from 'zod';
import { HttpStatusCodes } from '../constants/httpStatusCodes';
import { Messages } from '../constants/messages';

const CreateOrderSchema = z.object({
  customerName: z.string().min(1, { message: 'Customer name is required' }),
  totalAmount: z
    .number()
    .positive({ message: 'Total amount must be positive' }),
});

export class OrderController {
  private orderService: OrderService;

  constructor() {
    this.orderService = new OrderService();
  }

  createOrder = async (req: Request, res: Response) => {
    try {
      const validatedData = CreateOrderSchema.parse(req.body);
      const order = await this.orderService.createOrder(validatedData);
      res.status(201).json(order);
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return res
          .status(HttpStatusCodes.BAD_REQUEST)
          .json({ error: error.issues });
      }
      res.status(HttpStatusCodes.BAD_REQUEST).json({ error: error.message });
    }
  };

  getOrder = async (req: Request, res: Response) => {
    try {
      const order = await this.orderService.getOrder(req.params.id);
      if (!order) {
        return res.status(404).json({ error: Messages.ORDER_NOT_FOUND });
      }
      res.json(order);
    } catch (error: any) {
      res.status(HttpStatusCodes.BAD_REQUEST).json({ error: error.message });
    }
  };

  getOrders = async (req: Request, res: Response) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const orders = await this.orderService.getOrders(page, limit);
      res.json(orders);
    } catch (error: any) {
      res.status(HttpStatusCodes.BAD_REQUEST).json({ error: error.message });
    }
  };

  processPayment = async (req: Request, res: Response) => {
    try {
      const { paymentProvider } = req.body;
      const result = await this.orderService.processPayment(
        req.params.id,
        paymentProvider
      );
      res.json(result);
    } catch (error: any) {
      res.status(HttpStatusCodes.BAD_REQUEST).json({ error: error.message });
    }
  };
}
