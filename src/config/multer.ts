import { diskStorage } from 'multer';

export const MulterOptions = {
  storage: diskStorage({}),
  limits: { fileSize: 1024 * 1024 * 5 },
};

export const MulterOptionsExcel = {
  storage: diskStorage({
    destination: (req, file, cb) => {
      cb(null, './src/public');
    },
    filename(req, file, callback) {
      callback(null, file.originalname.slice(0, 10) + '.xlsx');
    },
  }),
  limits: { fileSize: 1024 * 1024 * 5 },
};
