import Medicine from '../models/Medicine'
import Orders, { OrderDocument, ordersDetailResponse } from '../models/Orders'
import User, { verifyResponse } from '../models/User'
import { BodyProp, Post, Route, Tags } from 'tsoa'
@Route('api/orders')
@Tags('Orders')
export class ordersController {
  @Post('/')
  async getOrders(
    @BodyProp() productId: string,
    @BodyProp() quantity: number,
    @BodyProp() customerId: string,
    @BodyProp() price
  ): Promise<verifyResponse> {
    const newOrder: OrderDocument = new Orders({ productId, quantity, buyerId: customerId, price })
    const findBuyer = await User.findById({ _id: customerId })
    const findMedicine = await Medicine.findById({ _id: productId })

    if (findMedicine) {
      newOrder.sellerId = findMedicine.userId.toHexString()
      newOrder.totalQuantity = findMedicine.quantity
      if (quantity > findMedicine.quantity) {
        throw {
          code: 403,
          message: `Total quantity Left Only: ${findMedicine.quantity}`
        }
      }
    }

    // console.log(findMedicine?.userId.toString())
    if (findBuyer) {
      newOrder.buyerName = findBuyer.name
      newOrder.buyerEmail = findBuyer.email
      newOrder.buyerNumber = findBuyer.phoneNumber
      newOrder.address = findBuyer.address
    }
    await newOrder.save()
    return {
      code: 200,
      message: 'order Process successfully'
    }
  }
  @Post('/details')
  async getOrdersDetail(): Promise<ordersDetailResponse> {
    const getData = await Orders.find()
    console.log(getData)
    return {
      code: 200,
      data: getData
    }
  }
}
