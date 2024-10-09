import mongoose, { Schema, Document } from 'mongoose';
import { IOrder, OrderStatus } from '../interfaces/IOrder';

const OrderSchema = new Schema(
  {
    customerName: { type: String, required: true },
    totalAmount: { type: Number, required: true },
    status: {
      type: String,
      enum: Object.values(OrderStatus),
      default: OrderStatus.PENDING,
    },
    paymentProvider: { type: String },
  },
  { timestamps: true }
);

export const Order = mongoose.model<IOrder & Document>('Order', OrderSchema);
