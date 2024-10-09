import {
  IPaymentProvider,
  PaymentResult,
} from '../interfaces/IPaymentProvider';

export class StripePaymentProvider implements IPaymentProvider {
  async processPayment(
    orderId: string,
    amount: number
  ): Promise<PaymentResult> {
    // connect to stripe sandbox or production
    console.log(
      `Processing Stripe payment for order ${orderId} with amount ${amount}`
    );

    // api delay - to simulate the delay in the api call
    await new Promise(resolve => setTimeout(resolve, 1000));

    return { success: true, transactionId: `stripe-${Date.now()}` };
  }
}
