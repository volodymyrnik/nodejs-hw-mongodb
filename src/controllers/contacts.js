import {
  allContacts,
  contactById,
  deleteContact,
  createContact,
  updateContact,
} from '../services/contacts.js';
import createHttpError from 'http-errors';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';

async function getContactsController(req, res) {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);

  const contacts = await allContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
  });

  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts',
    data: contacts, // ✅ немає зайвого data: [data]
  });
}


async function getContactByIdController(req, res) {
  const contactId = req.params.id;
  const contact = await contactById(contactId);

  if (contact === null) {
    throw createHttpError(404, 'Contact not found');
  }

  res.status(200).json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
}

async function createContactController(req, res) {
  const contact = await createContact(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: contact,
  });
}

async function updateContactController(req, res) {
  const contactId = req.params.id;
  const result = await updateContact(contactId, req.body);
  if (result === null) {
    throw createHttpError(404, 'Contact not found');
  }
  res.status(200).json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: result,
  });
}

async function deleteContactController(req, res) {
  const contactId = req.params.id;
  const result = await deleteContact(contactId);

  if (result === null) {
    throw createHttpError(404, 'Contact not found');
  }

  res.status(204).end();
}

export {
  getContactsController,
  getContactByIdController,
  deleteContactController,
  createContactController,
  updateContactController,
};