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
import * as fs from 'node:fs';
import path from 'node:path';
import swaggerUI from 'swagger-ui-express';


const PORT = Number(process.env.PORT || 3000);
const SWAGGER_DOCUMENT = JSON.parse(
  fs.readFileSync(path.join('docs', 'swagger.json'), 'utf-8'),
);

export const setupServer = () => {
  const app = express();

  app.use(cors());
  app.use(cookieParser());

  app.use(express.json());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    })
  );

    app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(SWAGGER_DOCUMENT));

  app.use('/photos', express.static(path.resolve('uploads', 'photos')));



  // ✅ Роути
  app.use('/auth', authRouter);
  app.use('/contacts', authenticate, contactRouter);

  app.use(notFoundHandler);
  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
