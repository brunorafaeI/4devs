import path from 'path'
import { diskStorage } from 'multer'
import { __dirname } from './global.js'

const tmpFolder = path.resolve(__dirname, "..","..","..","public","assets")

export default {
  directory: tmpFolder,
  storage: diskStorage({
    destination: tmpFolder,
    filename: (req, file, cb) => {
      cb(null, file.originalname)
    }
  })
}

