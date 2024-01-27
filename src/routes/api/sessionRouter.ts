import express, { Request, Response } from 'express'
import validateAccessToken from '../../middleware/authenticateToken'
import { sessionController } from '../../controllers/session'

let controller = new sessionController()

let sessionRouter = express.Router()

sessionRouter.get('/', validateAccessToken, async (req: Request, res: Response) => {
  try {
    let matchUser = await controller.getSessionInfo(req)

    return res.status(200).send(matchUser)
  } catch (err) {
    return res.status(403).send(err.message)
  }
})

export default sessionRouter
