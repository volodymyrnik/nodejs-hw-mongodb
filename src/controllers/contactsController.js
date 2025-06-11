import { Contact } from '../models/contacts.js'; // Імпортуємо модель Contact

// Функція для отримання всіх контактів
export const getAllContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find(); // Знайти всі контакти в базі даних
    res.status(200).json({
      status: 'success',
      message: 'Successfully found contacts',
      data: contacts,
    });
  } catch (error) {
    next(error); // Передаємо помилку до обробника помилок Express
  }
};

// Функція для отримання контакту за ID
export const getContactById = async (req, res, next) => {
  try {
    const { id } = req.params; // Отримуємо ID з параметрів запиту
    const contact = await Contact.findById(id); // Знайти контакт за ID

    if (!contact) {
      // Якщо контакт не знайдено
      return res.status(404).json({
        status: 'error',
        message: 'Contact not found',
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Successfully found contact',
      data: contact,
    });
  } catch (error) {
    next(error);
  }
};

