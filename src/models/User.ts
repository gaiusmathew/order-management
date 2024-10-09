import { IUser } from '../interfaces/IUser';
import mongoose, { Schema, Document } from 'mongoose';

const UserSchema: Schema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

export const User = mongoose.model<IUser>('User', UserSchema);
