import express from 'express';
import {
  getContactsController,
  getContactByIdController,
  createContactController,
  updateContactController,
  deleteContactController,
} from '../controllers/contacts.js';

const router = express.Router();

router.get('/', getContactsController);
router.get('/:id', getContactByIdController);
router.post('/', createContactController);
router.patch('/:id', updateContactController);
router.delete('/:id', deleteContactController);

export const contactsRouter = router;
