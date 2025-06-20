import 'dotenv/config';
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import pino from 'pino-http';

import authRouter from './routers/auth.js';
import contactRouter from './routers/contacts.js';

import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { authenticate } from './middlewares/authenticate.js';
import path from 'node:path';


const PORT = Number(process.env.PORT || 3000);

export const setupServer = () => {
  const app = express();

  app.use(cors());
  app.use('/photos', express.static(path.resolve('uploads', 'photos')));
  app.use(cookieParser());

  app.use(express.json());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    })
  );

  // ✅ Роути
  app.use('/auth', authRouter);
  app.use('/contacts', authenticate, contactRouter);

  app.use(notFoundHandler);
  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
