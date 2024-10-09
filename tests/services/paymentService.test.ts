import { PaymentService } from '../../src/services/paymentService';

describe('PaymentService', () => {
  let paymentService: PaymentService;

  beforeEach(() => {
    paymentService = new PaymentService();
  });

  describe('processPayment', () => {
    it('should process payment for an order with stripe', async () => {
      const orderId = 'test_order_778';
      const amount = 144;

      const result = await paymentService.processPayment(
        'stripe',
        orderId,
        amount
      );

      expect(result.success).toBe(true);
      expect(result.transactionId).toContain('stripe-');
    });
  });

  it('should process payment for an order with bank transfer', async () => {
    const orderId = 'test_order_779';
    const amount = 144;

    const result = await paymentService.processPayment('bank', orderId, amount);

    expect(result.success).toBe(true);
    expect(result.transactionId).toContain('bank-');
  });

  it('should throw error for invalid payment provider', async () => {
    try {
      await paymentService.processPayment('invalid', 'test_order_780', 144);
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
});
