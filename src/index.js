import dotenv from 'dotenv';
import { initMongoConnection } from './db/initMongoConnection.js'; // Зверніть увагу на .js
import { setupServer } from './server.js'; // Зверніть увагу на .js

dotenv.config();

async function bootstrap() {
  await initMongoConnection();
  setupServer();
}

bootstrap();