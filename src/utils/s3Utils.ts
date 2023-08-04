import { v2 } from 'cloudinary'
const cloudinaryConfig = (_req, _res, next) => {
  v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
  })
  next()
}
const uploader = v2.uploader
export { cloudinaryConfig, uploader }
