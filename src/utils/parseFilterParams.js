const parseContactType = (contactType) => {
  if (typeof contactType === 'undefined') {
    return undefined;
  }
  if (typeof contactType !== 'string') {
    return undefined;
  }
  const filterByKeys = ['work', 'home', 'personal'];
  if (filterByKeys.includes(contactType.toLowerCase()) !== true) {
    return undefined;
  }
  return contactType.toLowerCase();
};

const parseIsFavourite = (isFavourite) => {
  if (typeof isFavourite === 'undefined') return undefined;

  if (isFavourite === 'true') return true;
  if (isFavourite === 'false') return false;

  return undefined;
};

export const parseFilterParams = (query) => {
  const { contactType, isFavourite } = query;
  const parsedContactType = parseContactType(contactType);
  const parsedIsFavourite = parseIsFavourite(isFavourite);

  return {
    contactType: parsedContactType,
    isFavourite: parsedIsFavourite,
  };
};