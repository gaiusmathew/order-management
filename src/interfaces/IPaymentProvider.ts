export interface IPaymentProvider {
  processPayment(orderId: string, amount: number): Promise<PaymentResult>;
}

export interface PaymentResult {
  success: boolean;
  transactionId?: string;
  error?: string;
}
