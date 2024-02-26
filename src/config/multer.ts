import { diskStorage } from 'multer';
import path from 'path';

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
  fileFilter: (req:any, file:any, cb:any) => {
    console.log(file);
    const ext = file.mimetype
    console.log(file.originalname);
    if (ext !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
      return cb(new Error('Sadece .xlsx uzantısı  olan fayl yüklənməlidir.'))
    }
    cb(null, true);
  },
  limits: { fileSize: 1024 * 1024 * 5 },
};

