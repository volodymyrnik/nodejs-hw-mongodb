import { Router } from 'express';
import {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact
} from '../controllers/contactsController.js';

const contactsRouter = Router();

contactsRouter.get('/', getAllContacts);
contactsRouter.get('/:id', getContactById);
contactsRouter.post('/', createContact);
contactsRouter.put('/:id', updateContact);
contactsRouter.delete('/:id', deleteContact);

export { contactsRouter };