import multer from 'multer';
import path from 'node:path';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve('tmp'));
  },
  filename: function (req, file, cb) {
    const uniquePrefix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniquePrefix + '-' + file.originalname);
  },
});

export const upload = multer({ storage });