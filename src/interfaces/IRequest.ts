import { Request } from 'express';

interface IUser {
  id: string;
  username: string;
  password: string;
}

export interface IRequest extends Request {
  user?: IUser;
}
