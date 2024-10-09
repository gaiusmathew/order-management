import { IPaymentProvider } from '../interfaces/IPaymentProvider';
import { StripePaymentProvider } from '../providers/StripePaymentProvider';
import { BankTransferProvider } from '../providers/BankTransferProvider';

export class PaymentService {
  private providers: Map<string, IPaymentProvider>;

  constructor() {
    this.providers = new Map<string, IPaymentProvider>();
    this.providers.set('stripe', new StripePaymentProvider());
    this.providers.set('bank', new BankTransferProvider());
  }

  async processPayment(provider: string, orderId: string, amount: number) {
    const paymentProvider = this.providers.get(provider);
    if (!paymentProvider) {
      throw new Error('Payment provider not found');
    }
    return paymentProvider.processPayment(orderId, amount);
  }

  // to add new payment provider
  addPaymentProvider(name: string, provider: IPaymentProvider) {
    this.providers.set(name, provider);
  }
}
