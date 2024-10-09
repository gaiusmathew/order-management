import express from 'express';
import { connectDatabase } from './config/database';
import dotenv from 'dotenv';
import logger from './utils/logger';
import routes from './routes';
import cors from 'cors';

dotenv.config();

const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// connect to database
connectDatabase();

// routes version 1
routes.forEach(({ path, router }) => {
  app.use(`/api/v1${path}`, router);
});

// Error handling middleware
app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    logger.error(err.message);
    console.error(err.stack);
    res.status(500).json({ error: 'An error occured!' });
  }
);

export default app; // Export the Express app
