import { Request, Response } from 'express';
import { HttpStatusCodes } from '../constants/httpStatusCodes';
import { UserService } from '../services/userService';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { Messages } from '../constants/messages';

const JWT_SECRET = process.env.JWT_SECRET || '112hhhh';

const loginUserSchema = z.object({
  username: z.string().min(1, { message: 'Username is required' }),
  password: z.string().min(1, { message: 'Password is required' }),
});

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  createUser = async (req: Request, res: Response) => {
    try {
      const user = await this.userService.createUser(req.body);
      res.status(HttpStatusCodes.CREATED).json(user);
    } catch (error: any) {
      res.status(HttpStatusCodes.BAD_REQUEST).json({ error: error.message });
    }
  };

  loginUser = async (req: Request, res: Response) => {
    try {
      const validatedData = loginUserSchema.parse(req.body);
      const user = await this.userService.loginUser(
        validatedData.username,
        validatedData.password
      );

      if (!user) {
        return res
          .status(HttpStatusCodes.UNAUTHORIZED)
          .json({ error: Messages.INVALID_CREDENTIALS });
      }

      // Generate JWT token and return it
      const token = jwt.sign({ userId: user._id }, JWT_SECRET);

      res.json({ token });
    } catch (error: any) {
      res.status(HttpStatusCodes.BAD_REQUEST).json({ error: error.message });
    }
  };
}
