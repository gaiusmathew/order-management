import { BankTransferProvider } from '../../src/providers/BankTransferProvider';
import { PaymentResult } from '../../src/interfaces/IPaymentProvider';

describe('BankTransferProvider', () => {
  let bankProvider: BankTransferProvider;

  beforeEach(() => {
    bankProvider = new BankTransferProvider();
  });

  it('should process payment successfully', async () => {
    const result: PaymentResult = await bankProvider.processPayment('1', 25);

    expect(result.success).toBe(true);
    expect(result.transactionId).toMatch(/^bank-\d+$/);
  });

  it('should handle payment failure', async () => {
    try {
      await bankProvider.processPayment('1', -25);
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
});
