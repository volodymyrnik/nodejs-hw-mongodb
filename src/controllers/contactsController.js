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

// Функція для створення нового контакту
export const createContact = async (req, res, next) => {
  try {
    const newContact = await Contact.create(req.body); // Створити новий контакт з даних запиту
    res.status(201).json({ // 201 Created
      status: 'success',
      message: 'Successfully created contact',
      data: newContact,
    });
  } catch (error) {
    next(error);
  }
};

// Функція для оновлення контакту за ID
export const updateContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedContact = await Contact.findByIdAndUpdate(id, req.body, { new: true }); // Оновити та повернути оновлений об'єкт

    if (!updatedContact) {
      return res.status(404).json({
        status: 'error',
        message: 'Contact not found',
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Successfully updated contact',
      data: updatedContact,
    });
  } catch (error) {
    next(error);
  }
};

// Функція для видалення контакту за ID
export const deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedContact = await Contact.findByIdAndDelete(id); // Видалити та повернути видалений об'єкт

    if (!deletedContact) {
      return res.status(404).json({
        status: 'error',
        message: 'Contact not found',
      });
    }

    // 204 No Content - зазвичай для успішного видалення
    res.status(204).send(); // Відправляємо порожню відповідь
  } catch (error) {
    next(error);
  }
};