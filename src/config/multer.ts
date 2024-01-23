import { diskStorage } from 'multer'

export const MulterOptions = {
  storage: diskStorage({
    destination(req, file, cb) {
      cb(null, 'public/profile_img')
    }
  }),
  limits: { fileSize: 1024 * 1024 * 5 },
}
