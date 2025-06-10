import express from 'express';
import {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const contactsRouter = express.Router();

contactsRouter.get('/', ctrlWrapper(getAllContacts));
contactsRouter.get('/:contactId', ctrlWrapper(getContactById));
contactsRouter.post('/', ctrlWrapper(createContact));
contactsRouter.put('/:contactId', ctrlWrapper(updateContact));
contactsRouter.delete('/:contactId', ctrlWrapper(deleteContact));

export { contactsRouter };
