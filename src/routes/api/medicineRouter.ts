import express, { Request, Response } from 'express'
import { medicineController } from '../../controllers/medicine'
import { editDetailValidation, medicineInfoValidation } from '../../utils/medicineValidation'
// import { MedicineResponse } from '../../models/Medicine'

import { multerUploads } from '../../middleware/multerMiddleware'
import { medicineDetailResponse } from '../../models/Medicine'
import { verifyResponse } from 'src/models/User'

const medicineRouter = express.Router()
const controller = new medicineController()

medicineRouter.post('/upload/:userId', multerUploads.array('image'), async (req: Request, res: Response) => {
  try {
    if (!req.files || !req.files.length) return res.status(403).send('File not Found')
    console.log(req.params.userId)
    const { error, value: body } = medicineInfoValidation(req.body)
    if (error) return res.status(403).send(error.details[0].message)
    const files = req.files as Express.Multer.File[]
    const response: any = await controller.getMedicineFile(
      body.name,
      body.description,
      body.weight,
      body.expireDate,
      body.dosageInstructions,
      body.availability,
      body.price,
      body.quantity,
      req.params.userId,
      files
    )

    return res.status(response.code).send(response.message)
  } catch (error) {
    return res.status(error.code || 403).send(error.message)
  }
})

medicineRouter.get('/detail', async (_req: Request, res: Response) => {
  try {
    const response: medicineDetailResponse = await controller.getMedicineDetails()
    if (!response) return res.status(403).send('Network Error')

    return res.status(response.code).json(response.data)
  } catch (error) {
    return res.status(403).send(error)
  }
})
medicineRouter.patch('/edit/:id', async (req: Request, res: Response) => {
  try {
    const { error, value: body } = editDetailValidation(req.body)
    if (error) return res.status(403).send(error.details[0].message)
    const response: verifyResponse = await controller.editMedicineDetails(req.params.id, body.quantity, body.price)

    return res.status(response.code).send(response.message)
  } catch (error) {
    return res.send(error.code).send(error.message)
  }
})
export default medicineRouter
