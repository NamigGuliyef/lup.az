import { diskStorage } from 'multer'

export const MulterOptions = {
  storage: diskStorage({}),
  limits: { fileSize: 1024 * 1024 * 5 },
}
