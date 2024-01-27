import express, { Request, Response } from 'express'
import { AuthController } from '../../controllers/auth'
import {
  signUpValidation,
  loginValidation,
  verifyValidation,
  sendEmailValidation,
  loginDetailValidation,
  profileValidation
} from '../../utils/authValidation'
import { LoginDetailResponse, verifyResponse } from '../../models/User'
import { multerUploads } from '../../middleware/multerMiddleware'

const authRouter = express.Router()

const controller = new AuthController()

authRouter.post('/signup', async (req: Request, res: Response) => {
  try {
    const { error, value: body } = signUpValidation(req.body)
    if (error) return res.status(403).send(error.details[0].message)

    const response: verifyResponse = await controller.signup(body.name, body.email, body.password, body.conformPassword, body.role)

    return res.status(response.code).send(response.message)
  } catch (err) {
    return res.status(err.code || 403).send(err.message)
  }
})
authRouter.post('/login', async (req: Request, res: Response) => {
  try {
    const { error, value: body } = loginValidation(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    const response: verifyResponse = await controller.login(body.email, body.password)
    return res.status(200).send(response.code)
  } catch (err) {
    return res.status(err.code || 403).send(err.message)
  }
})
authRouter.post('/send/verification', async (req: Request, res: Response) => {
  try {
    const { error, value: body } = sendEmailValidation(req.body)
    if (error) res.status(403).send(error.details[0].message)
    const response: verifyResponse = await controller.sendEmail(body.email)
    return res.status(response.code).send(response.message)
  } catch (error) {
    return res.status(error.code || 403).send(error.message)
  }
})
authRouter.post('/email/verify', async (req: Request, res: Response) => {
  try {
    const { error, value: body } = verifyValidation(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const response: verifyResponse = await controller.verifyEmail(body.email, body.verificationCode)
    return res.status(response.code).send(response)
  } catch (error) {
    return res.status(error.code || 403).send(error.message)
  }
})
authRouter.post('/profile/:email', multerUploads.single('image'), async (req: Request, res: Response) => {
  try {
    const { error, value: body } = profileValidation(req.body)
    if (error) return res.status(403).send(error.details[0].message)
    console.log(req.params)
    if (!req.file) return res.status(403).send('File not found')
    const file = req.file as Express.Multer.File
    const response: verifyResponse = await controller.getProfileDetails(file, body.phoneNumber, body.address, req.params.email)
    return res.status(response.code).send(response.message)
  } catch (error) {
    return res.status(error.code || 403).send(error.message)
  }
})
authRouter.get('/login/details/:email', async (req, res) => {
  try {
    const { error, value: body } = loginDetailValidation(req.params)
    if (error) return res.status(403).send(error.details[0].message)
    const response: LoginDetailResponse = await controller.getLoginDetails(body.email)
    return res.status(200).send(response.data)
  } catch (error) {
    return res.status(error.code).send(error.message)
  }
})

export default authRouter
