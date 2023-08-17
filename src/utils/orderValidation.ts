import Joi from 'joi'
import { OrderDocument } from 'src/models/Orders'

export const getOrderValidation = (data: OrderDocument): Joi.ValidationResult =>
  Joi.object({
    productId: Joi.string().required(),
    quantity: Joi.number().required(),
    customerId: Joi.string().required(),
    price: Joi.number().required()
  }).validate(data)
