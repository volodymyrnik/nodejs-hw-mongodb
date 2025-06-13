import { isValidObjectId } from 'mongoose';
import createHttpError from 'http-errors';

export const isValidId = (req, res, next) => {
  if (isValidObjectId(req.params.id) !== true) {
    return next(createHttpError(400, 'Bad request'));
  }
  next();
};