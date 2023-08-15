import express from 'express'
import authRouter from './authRouter'
import sessionRouter from './sessionRouter'
import swaggerUi from 'swagger-ui-express'
import medicineRouter from './medicineRouter'
import orderRouter from './ordersRouter'

const router = express.Router()

router.use('/auth', authRouter)
router.use('/session', sessionRouter)
router.use('/medicine', medicineRouter)
router.use('/orders', orderRouter)

router.use(
  '/',
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    swaggerOptions: {
      url: '/swagger.yaml'
    }
  })
)

export default router
