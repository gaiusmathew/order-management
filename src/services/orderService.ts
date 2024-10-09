import { Order } from '../models/Order';
import { IOrder, OrderStatus } from '../interfaces/IOrder';
import { PaymentService } from './paymentService';
import { OrderRepository } from '../repository/orderRepository';

export class OrderService {
  private paymentService: PaymentService;
  private orderRepository: OrderRepository;

  constructor() {
    this.paymentService = new PaymentService();
    this.orderRepository = new OrderRepository();
  }

  async createOrder(orderData: IOrder) {
    orderData.status = OrderStatus.PENDING;
    const order = new Order(orderData);
    return await this.orderRepository.create(order);
  }

  async getOrder(orderId: string) {
    return await this.orderRepository.getById(orderId);
  }

  async getOrders(page: number = 1, limit: number = 10) {
    return await this.orderRepository.getAll(page, limit);
  }

  async processPayment(orderId: string, paymentProvider: string) {
    const order = await this.orderRepository.getById(orderId);
    if (!order) {
      throw new Error('Order not found');
    }

    try {
      const paymentResult = await this.paymentService.processPayment(
        paymentProvider,
        orderId,
        order.totalAmount
      );

      order.status = paymentResult.success
        ? OrderStatus.PAID
        : OrderStatus.FAILED;
      order.paymentProvider = paymentProvider;
      await order.save();

      return { order, paymentResult };
    } catch (error) {
      order.status = OrderStatus.FAILED;
      await order.save();
      throw error;
    }
  }
}
