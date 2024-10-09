import { Order } from '../models/Order';
import { IOrder } from '../interfaces/IOrder';

export class OrderRepository {
  async create(orderData: IOrder) {
    const order = new Order(orderData);
    return await order.save();
  }

  async getById(orderId: string) {
    return await Order.findById(orderId);
  }

  async getAll(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    return await Order.find().skip(skip).limit(limit).sort({ createdAt: -1 });
  }

  async update(orderId: string, updateData: Partial<IOrder>) {
    return await Order.findByIdAndUpdate(orderId, updateData, { new: true });
  }
}
