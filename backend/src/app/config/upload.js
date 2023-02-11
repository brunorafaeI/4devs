import path from 'path'
import multer, { diskStorage } from 'multer'
import { __dirname } from './global.js'

const tmpFolder = path.resolve(__dirname, '..', '..', '..', 'public', 'assets')

export const uploadSetting = {
  directory: tmpFolder,
  storage: diskStorage({
    destination: tmpFolder,
    filename: (req, file, cb) => {
      cb(null, new Date().getTime() + file.originalname.replace(/(.*)(\.\w+)$/, '$2'))
    }
  })
}

export const uploadStorage = multer({ storage: uploadSetting.storage })
