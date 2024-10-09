export interface IOrder {
  id?: string;
  customerName: string;
  totalAmount: number;
  status?: OrderStatus;
  paymentProvider?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export enum OrderStatus {
  PENDING = 'pending',
  PAID = 'paid',
  FAILED = 'failed',
}
