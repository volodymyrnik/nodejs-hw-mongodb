import {
  allContacts,
  contactById,
  deleteContact,
  createContact,
  updateContact,
} from '../services/contacts.js';
import createHttpError from 'http-errors';

// Отримати всі контакти
export async function getContactsController(req, res, next) {
  try {
    const contacts = await allContacts();
    res.status(200).json({
      status: 200,
      message: 'Successfully found contacts',
      data: contacts,
    });
  } catch (error) {
    next(error);
  }
}

// Отримати контакт за ID
export async function getContactByIdController(req, res, next) {
  try {
    const contactId = req.params.id;
    const contact = await contactById(contactId);

    if (!contact) {
      throw createHttpError(404, 'Contact not found');
    }

    res.status(200).json({
      status: 200,
      message: `Successfully found contact with id ${contactId}!`,
      data: contact,
    });
  } catch (error) {
    next(error);
  }
}

// Створити контакт
export async function createContactController(req, res, next) {
  try {
    const contact = await createContact(req.body);

    res.status(201).json({
      status: 201,
      message: 'Successfully created a contact!',
      data: contact,
    });
  } catch (error) {
    next(error);
  }
}

// Оновити контакт (PATCH)
export async function updateContactController(req, res, next) {
  try {
    const contactId = req.params.id;
    const result = await updateContact(contactId, req.body);

    if (!result) {
      throw createHttpError(404, 'Contact not found');
    }

    res.status(200).json({
      status: 200,
      message: 'Successfully patched a contact!',
      data: result,
    });
  } catch (error) {
    next(error);
  }
}

// Видалити контакт
export async function deleteContactController(req, res, next) {
  try {
    const contactId = req.params.id;
    const result = await deleteContact(contactId);

    if (!result) {
      throw createHttpError(404, 'Contact not found');
    }

    res.status(204).end();
  } catch (error) {
    next(error);
  }
}
