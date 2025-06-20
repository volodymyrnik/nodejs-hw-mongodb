import * as fs from 'node:fs/promises';Add commentMore actions
import path from 'node:path';

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
import { uploadToCloudinary } from '../utils/uploadToCloudinary.js';
import { getEnvVar } from '../utils/getEnvVar.js';

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
    userId: req.user.id, // ✅ обмеження по користувачу
  });

  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data: {
      data: contacts.contacts,
      page: contacts.page,
      perPage: contacts.perPage,
      totalItems: contacts.totalItems,
      totalPages: contacts.totalPages,
      hasPreviousPage: contacts.hasPreviousPage,
      hasNextPage: contacts.hasNextPage,
    },
  });
}

async function getContactByIdController(req, res) {
  const contactId = req.params.id;
  const contact = await contactById(contactId, req.user.id); // ✅ перевірка власника

  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }

  res.status(200).json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
}

async function createContactController(req, res) {
let photo = null;Add commentMore actions

  if (getEnvVar('UPLOAD_TO_CLOUDINARY') === 'true') {
    const result = await uploadToCloudinary(req.file.path);
    await fs.unlink(req.file.path);
    photo = result.secure_url;
  } else
    await fs.rename(
      req.file.path,
      path.resolve('uploads', 'photos', req.file.filename),
    ),
      (photo = `http://localhost:3000/photos/${req.file.filename}`);
  const contact = await createContact({
    ...req.body,
    userId: req.user.id,
    photo,
  });

  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: contact,
  });
}

async function updateContactController(req, res) {
  const contactId = req.params.id;
  const result = await updateContact(contactId, req.body, req.user.id); // ✅ зміни лише свого контакту

  if (!result) {
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
  const result = await deleteContact(contactId, req.user.id); // ✅ видалення тільки свого контакту

  if (!result) {
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
