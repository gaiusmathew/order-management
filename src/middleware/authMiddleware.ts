import { Response, NextFunction } from 'express'; // Import custom interface
import jwt from 'jsonwebtoken';
import { HttpStatusCodes } from '../constants/httpStatusCodes';
import { IRequest } from '../interfaces/IRequest';
import { Messages } from '../constants/messages';

const JWT_SECRET = process.env.JWT_SECRET || '112hhhh';

export const authenticateJWT = (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
      if (err) {
        return res
          .status(HttpStatusCodes.UNAUTHORIZED)
          .json({ error: Messages.INVALID_TOKEN });
      }

      req.user = user;
      next();
    });
  } else {
    res
      .status(HttpStatusCodes.UNAUTHORIZED)
      .json({ error: Messages.UN_AUTHORIZED });
  }
};
