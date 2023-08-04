import multer from 'multer'
import path from 'path'

const multerStorage = multer.diskStorage({
  destination: (_request, _file, callback) => {
    callback(null, path.resolve(__dirname, '../../public/images'))
  },

  filename: (_request, file, callback) => {
    callback(null, file.originalname)
  }
})
const multerUploads = multer({ storage: multerStorage })

export { multerUploads }
