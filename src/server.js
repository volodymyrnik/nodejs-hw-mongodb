import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import { contactsRouter } from './routes/contactsRouter.js';

function setupServer() {
  const app = express();

  app.use(express.json()); // Цей рядок дуже важливий!
  app.use(cors());
  app.use(pino());

  app.use('/contacts', contactsRouter);

  // Обробка неіснуючих маршрутів
  app.use('*', (req, res) => {
    res.status(404).json({ message: 'Not found' });
  });

  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

export { setupServer };