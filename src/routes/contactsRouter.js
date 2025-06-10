import { Router } from 'express'; // Імпорт Router з Express

// Припустимо, що ці функції-контролери знаходяться у файлі ../controllers/contactsController.js
// Вам потрібно буде створити цей файл та визначити в ньому ці функції.
import {
  getAllContacts,     // Функція для отримання всіх контактів
  getContactById,     // Функція для отримання контакту за ID
  createContact,      // Функція для створення нового контакту
  updateContact,      // Функція для оновлення контакту
  deleteContact       // Функція для видалення контакту
} from '../controllers/contactsController.js'; // Зверніть увагу на .js розширення!

const contactsRouter = Router(); // Створення екземпляра роутера

// Визначення маршрутів
contactsRouter.get('/', getAllContacts); // GET /contacts - отримати всі контакти
contactsRouter.get('/:id', getContactById); // GET /contacts/:id - отримати контакт за ID
contactsRouter.post('/', createContact); // POST /contacts - створити новий контакт
contactsRouter.put('/:id', updateContact); // PUT /contacts/:id - оновити контакт за ID
contactsRouter.delete('/:id', deleteContact); // DELETE /contacts/:id - видалити контакт за ID

export { contactsRouter }; // Експорт роутера як іменованого експорту