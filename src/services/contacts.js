import { Contact } from '../models/contacts.js';

export const allContacts = async ({
  page,
  perPage,
  sortBy,
  sortOrder,
  filter,
  userId,
}) => {
  const skip = page > 0 ? (page - 1) * perPage : 0;

  const contactsQuery = Contact.find({ userId });

  if (filter.contactType) {
    contactsQuery.where('contactType').equals(filter.contactType);
  }

  if (typeof filter.isFavourite === 'boolean') {
    contactsQuery.where('isFavourite').equals(filter.isFavourite);
  }

  const [totalItems, contacts] = await Promise.all([
    Contact.countDocuments({ userId, ...contactsQuery.getQuery() }),
    contactsQuery
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(perPage),
  ]);

  const totalPages = Math.ceil(totalItems / perPage);
  return {
    contacts,
    page,
    perPage,
    totalItems,
    totalPages,
    hasPreviousPage: page > 1,
    hasNextPage: totalPages > page,
  };
};

export const contactById = async (contactId, userId) => {
  const contact = await Contact.findOne({ _id: contactId, userId });
  return contact;
};

export const createContact = async (payload) => {
  const contact = await Contact.create(payload);
  return contact;
};

export const updateContact = async (contactId, payload, userId) => {
  const contact = await Contact.findOneAndUpdate(
    { _id: contactId, userId },
    payload,
    { new: true }
  );
  return contact;
};

export const deleteContact = async (contactId, userId) => {
  const contact = await Contact.findOneAndDelete({ _id: contactId, userId });
  return contact;
};
