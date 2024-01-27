import express, { Request, Response } from 'express'
import { ordersController } from '../../controllers/orders'
import { verifyResponse } from '../../models/User'
import { getOrderValidation } from '../../utils/orderValidation'
import { ordersDetailResponse } from 'src/models/Orders'

const orderRouter = express.Router()
const controller = new ordersController()

orderRouter.post('/', async (req: Request, res: Response) => {
  try {
    const { error, value: body } = getOrderValidation(req.body)
    console.log('validation done')
    if (error) return res.status(403).send(error.details[0].message)
    const response: verifyResponse = await controller.getOrders(body.productId, body.quantity, body.customerId, body.price)
    return res.status(response.code).send(response)
  } catch (error) {
    return res.status(error.code || 403).send(error.message || 'Network Error')
  }
})

orderRouter.get('/details', async (_req: Request, res: Response) => {
  try {
    const response: ordersDetailResponse = await controller.getOrdersDetail()

    return res.status(response.code).send(response.data)
  } catch (error) {
    return res.status(error.code || 403).send(error.message)
  }
})
export default orderRouter
