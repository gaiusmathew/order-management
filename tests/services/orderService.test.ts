import { OrderService } from '../../src/services/orderService';
import { Order } from '../../src/models/Order';
import { OrderStatus } from '../../src/interfaces/IOrder';
import mongoose from 'mongoose';

jest.mock('../../src/models/Order');

describe('OrderService', () => {
  let orderService: OrderService;

  beforeEach(() => {
    orderService = new OrderService();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createOrder', () => {
    it('Should create an order', async () => {
      const sampleOrderData = {
        customerName: 'Sam Smith',
        totalAmount: 100,
        status: OrderStatus.PENDING,
      };

      const sampleSavedOrder = {
        _id: new mongoose.Types.ObjectId(),
        ...sampleOrderData,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      (Order.prototype.save as jest.Mock).mockResolvedValueOnce(
        sampleSavedOrder
      );

      const result = await orderService.createOrder(sampleOrderData);

      expect(result).toEqual(sampleSavedOrder);
    });
  });

  describe('getOrder', () => {
    it('should get an order by id', async () => {
      const sampleOrder = {
        _id: new mongoose.Types.ObjectId(),
        customerName: 'Sam Smith',
        totalAmount: 150,
        status: OrderStatus.PENDING,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      (Order.findById as jest.Mock).mockResolvedValueOnce(sampleOrder);

      const result = await orderService.getOrder(sampleOrder._id.toString());

      expect(result).toEqual(sampleOrder);
    });

    it('should return null if order not found', async () => {
      (Order.findById as jest.Mock).mockResolvedValueOnce(null);

      const result = await orderService.getOrder('invalid-id');

      expect(result).toBeNull();
    });
  });

  describe('getOrders', () => {
    it('should get a list of orders', async () => {
      const sampleOrders = [
        {
          _id: new mongoose.Types.ObjectId(),
          customerName: 'Sam Smith',
          totalAmount: 150,
          status: OrderStatus.PENDING,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          _id: new mongoose.Types.ObjectId(),
          customerName: 'John Doe',
          totalAmount: 200,
          status: OrderStatus.PENDING,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      const mockSkip = jest.fn().mockReturnThis();
      const mockLimit = jest.fn().mockReturnThis();
      const mockSort = jest.fn().mockResolvedValue(sampleOrders);

      (Order.find as jest.Mock).mockReturnValue({
        skip: mockSkip,
        limit: mockLimit,
        sort: mockSort,
      });

      const result = await orderService.getOrders();

      expect(result).toEqual(sampleOrders);
      expect(Order.find).toHaveBeenCalled();
      expect(mockSkip).toHaveBeenCalledWith(0);
      expect(mockLimit).toHaveBeenCalledWith(10);
      expect(mockSort).toHaveBeenCalledWith({ createdAt: -1 });
    });
  });
});
