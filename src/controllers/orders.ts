import Orders, { OrderDocument, ordersDetailResponse } from '../models/Orders'
import { verifyResponse } from '../models/User'
import { BodyProp, Post, Route, Tags } from 'tsoa'
@Route('api/orders')
@Tags('Orders')
export class ordersController {
  @Post('/')
  async getOrders(
    @BodyProp() productId: string,
    @BodyProp() quantity: number,
    @BodyProp() userId: string,
    @BodyProp() price
  ): Promise<verifyResponse> {
    console.log(productId)
    console.log(quantity)
    const newOrder: OrderDocument = new Orders({ productId, quantity, userId, price })
    await newOrder.save()
    return {
      code: 200,
      message: 'order Process successfully'
    }
  }
  @Post('/detail')
  async getOrdersDetail(): Promise<ordersDetailResponse> {
    return {
      code: 200,
      data: {}
    }
  }
}
