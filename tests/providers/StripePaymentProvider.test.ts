import { StripePaymentProvider } from '../../src/providers/StripePaymentProvider';
import { PaymentResult } from '../../src/interfaces/IPaymentProvider';

describe('StripePaymentProvider', () => {
  let provider: StripePaymentProvider;

  beforeEach(() => {
    provider = new StripePaymentProvider();
  });

  it('should process payment successfully', async () => {
    const result: PaymentResult = await provider.processPayment('1', 100);

    expect(result.success).toBe(true);
    expect(result.transactionId).toMatch(/^stripe-\d+$/);
  });

  it('should handle payment failure', async () => {
    try {
      await provider.processPayment('1', -100);
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
});
