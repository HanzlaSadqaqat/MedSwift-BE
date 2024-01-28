import express from 'express'
import dotenv from 'dotenv'
import router from './routes/api'
import mongoose from 'mongoose'
import path from 'path'
import cors from 'cors'
import { cloudinaryConfig } from './utils/s3Utils'
// import multer from 'multer'

dotenv.config()

const app = express()

app.use('*', cloudinaryConfig)

// const upload = multer()

const appPromise = async () => {
  const port = process.env.PORT || 8080
  app.use(express.json({ limit: '100mb' }))
  app.use(express.static(path.join(__dirname, '../public')))
  app.use(express.urlencoded({ extended: true }))
  app.use(cors())
  app.use('/api', router)

  await mongoose.connect(`${process.env.MONGO_URI}`).then(() => {
    console.log('MongoDB connected')
  })
  app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
  })
}

appPromise()

export default app
