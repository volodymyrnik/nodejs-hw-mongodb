require('dotenv').config();
const { initMongoConnection } = require('./db/initMongoConnection');
const { setupServer } = require('./server');

async function bootstrap() {
  await initMongoConnection();
  setupServer();
}

bootstrap();
