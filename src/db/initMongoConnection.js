import mongoose from 'mongoose'; // <-- Це вже ES-модуль import

import { getEnvVar } from '../utils/getEnvVar.js'; // <-- Це також ES-модуль import з розширенням .js

export const initMongoConnection = async () => { // <-- Це ES-модуль export
  try {
    const user = getEnvVar('MONGODB_USER');
    const pwd = getEnvVar('MONGODB_PASSWORD');
    const url = getEnvVar('MONGODB_URL');
    const db = getEnvVar('MONGODB_DB');

    await mongoose.connect(
      `mongodb+srv://vladimirnik:1927@cluster0.aen4s4g.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`,
    );
    console.log('Mongo connection successfully established!');
  } catch (e) {
    console.log('Error while setting up mongo connection', e);
    throw e;
  }
};