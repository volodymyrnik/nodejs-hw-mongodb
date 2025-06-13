const parseNumber = (value, defaultValue) => {
  if (typeof value === 'undefined') {
    return defaultValue;
  }
  const parsedValue = parseInt(value);

  if (Number.isNaN(parsedValue) === true) {
    return defaultValue;
  }
  return parsedValue;
};

export const parsePaginationParams = (query) => {
  const { page, perPage } = query;

  const parsedPage = parseNumber(page, 1);
  const parsedPerPage = parseNumber(perPage, 10);

  return {
    page: parsedPage,
    perPage: parsedPerPage,
  };
};