import { Contact } from '../models/contacts.js';

export const allContacts = async () => {
  const contacts = await Contact.find();
  return contacts;
};

export const contactById = async (contactId) => {
  const contact = await Contact.findById(contactId);
  return contact;
};