import { Contact } from '../models/contacts.js'; // Імпортуємо модель Contact

// Функція для отримання всіх контактів
export const getAllContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json({
      status: 200,
      message: 'Successfully found contacts',
      data: contacts,
    });
  } catch (error) {
    next(error);
  }
};

// Функція для отримання контакту за ID
export const getContactById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findById(id);

    if (!contact) {
      return res.status(404).json({
        status: 404,
        message: 'Contact not found',
      });
    }

    res.status(200).json({
      status: 200,
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
    const newContact = await Contact.create(req.body);
    res.status(201).json({
      status: 201,
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
    const updatedContact = await Contact.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedContact) {
      return res.status(404).json({
        status: 404,
        message: 'Contact not found',
      });
    }

    res.status(200).json({
      status: 200,
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
    const deletedContact = await Contact.findByIdAndDelete(id);

    if (!deletedContact) {
      return res.status(404).json({
        status: 404,
        message: 'Contact not found',
      });
    }

    // Відправляємо 204 без статусу в тілі (це ок)
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
