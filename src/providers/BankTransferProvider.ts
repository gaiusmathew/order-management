import {
  IPaymentProvider,
  PaymentResult,
} from '../interfaces/IPaymentProvider';

export class BankTransferProvider implements IPaymentProvider {
  async processPayment(
    orderId: string,
    amount: number
  ): Promise<PaymentResult> {
    // connect to bank transfer api
    console.log(
      `Processing Bank Transfer payment for order ${orderId} with amount ${amount}`
    );

    // api delay - to simulate the delay in the api call
    await new Promise(resolve => setTimeout(resolve, 1000));

    return { success: true, transactionId: `bank-${Date.now()}` };
  }
}
