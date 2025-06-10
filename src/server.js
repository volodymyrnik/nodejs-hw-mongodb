import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import { contactsRouter } from './routes/contactsRouter.js';

function setupServer() {
  const app = express();

  // Додаємо middleware для обробки JSON-тіла запитів
  app.use(express.json());
  // Додаємо middleware для дозволу крос-доменних запитів (CORS)
  app.use(cors());
  // Додаємо логгер для HTTP-запитів
  app.use(pino());

  // Реєструємо маршрути для контактів під префіксом /contacts
  app.use('/contacts', contactsRouter);

  // Обробка неіснуючих маршрутів (catch-all route)
  // Важливо: для Express 5 використовуємо '/*any' замість '*'
  app.use('/*any', (req, res) => {
    res.status(404).json({ message: 'Not found' });
  });

  // Встановлюємо порт для сервера з змінної оточення або використовуємо 3000 за замовчуванням
  const PORT = process.env.PORT || 3000;

  // Запускаємо сервер
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

export { setupServer };