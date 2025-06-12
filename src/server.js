import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import { contactsRouter } from './routers/contactsRouter.js'; // ✅ ОНОВЛЕНО
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';

const PORT = Number(process.env.PORT || 3000);

export const setupServer = () => {
  const app = express();

  app.use(cors());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    })
  );

  app.use(express.json()); // Рекомендовано для обробки JSON-тел
  app.use('/contacts', contactsRouter); // ✅ ОНОВЛЕНО

  app.use(notFoundHandler);
  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
